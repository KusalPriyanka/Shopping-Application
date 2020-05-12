const router = require("express").Router();

const FeedbackModel = require("../model/FeedbackModel");
const {
  feedbackValidation,
} = require("../model/Validation/FeedbackModel.Validation");

const userId = "5eba1e88a99d72339008a1eb";

router.get("/", async (req, res) => {
  const feedbacks = await FeedbackModel.find();
  res.send(feedbacks);
});

router.post("/add", async (req, res) => {
  // Validation
  const { error } = feedbackValidation(req.body);
  if (error) return res.status(404).send(error.details[0].message);

  const feedbackExist = await FeedbackModel.findOne({
    $and: [{ userId: userId }, { productId: req.body.productId }],
  });

  if (feedbackExist)
    return res.status(404).send("Already published the feedback!");

  const feedback = new FeedbackModel({
    productId: req.body.productId,
    rating: req.body.rating,
    feedback: req.body.feedback,
    userId: userId,
  });

  try {
    await feedback.save();
    res.send({ feedbackId: feedback._id });
  } catch (err) {
    res.status(400).send(err);
  }
});

router.put("/edit", async (req, res) => {
  const ObjectId = require("mongoose").Types.ObjectId;

  const feedback = await FeedbackModel.findById(
    new ObjectId(req.body.feedbackId)
  );

  if (!feedback)
    return res.status(404).send("There is no feedback related to the id");

  feedback.rating = req.body.rating;
  feedback.feedback = req.body.feedback;

  try {
    await feedback.save();
    res.send({ feedbackId: feedback._id });
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;

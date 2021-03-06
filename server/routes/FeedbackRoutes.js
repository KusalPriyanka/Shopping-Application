const router = require("express").Router();
const FeedbackModel = require("../model/FeedbackModel");
const UserModel = require("../model/UserModel");
const {
  feedbackValidation,
} = require("../model/Validation/FeedbackModel.Validation");
const verifyToken = require("./Authentication/VerifyToken");

router.get("/:id", verifyToken, async (req, res) => {
  const feedbacks = await FeedbackModel.find({ productId: req.params.id });

  const asyncRes = await Promise.all(
    feedbacks.map(async (feedbackObj) => {
      const obj = {
        _id: feedbackObj._id,
        rating: feedbackObj.rating,
        feedback: feedbackObj.feedback,
        userImage: getUserImage(feedbackObj.userId),
        editableMode: feedbackObj.userId === req.user._id ? true : false,
        img: await getUserImage(feedbackObj.userId),
      };
      return obj;
    })
  );
  res.send(asyncRes);
});

const getUserImage = async (userId) => {
  let user = await UserModel.findOne({ _id: userId }, "userImage");
  return user.userImage;
};

router.post("/add", verifyToken, async (req, res) => {
  // Validation
  const { error } = feedbackValidation(req.body);
  if (error) return res.status(404).send(error.details[0].message);

  const feedbackExist = await FeedbackModel.findOne({
    $and: [{ userId: req.user._id }, { productId: req.body.productId }],
  });

  if (feedbackExist)
    return res.status(404).send("Already published the feedback!");

  const feedback = new FeedbackModel({
    productId: req.body.productId,
    rating: req.body.rating,
    feedback: req.body.feedback,
    userId: req.user._id,
  });

  try {
    await feedback.save();
    res.send({ feedbackId: feedback._id });
  } catch (err) {
    res.status(400).send(err);
  }
});

router.put("/edit", verifyToken, async (req, res) => {
  const ObjectId = require("mongoose").Types.ObjectId;

  const feedback = await FeedbackModel.findById(
    new ObjectId(req.body.feedbackId)
  );

  if (!feedback)
    return res.status(404).send("There is no feedback related to the id");

  if (feedback.userId != req.user._id)
    return res.status(401).send("Access Denied!");

  feedback.rating = req.body.rating;
  feedback.feedback = req.body.feedback;

  try {
    await feedback.save();
    res.send({ feedbackId: feedback._id });
  } catch (err) {
    res.status(400).send(err);
  }
});

router.delete("/delete", verifyToken, async (req, res) => {
  const ObjectId = require("mongoose").Types.ObjectId;

  try {
    await FeedbackModel.deleteOne({ _id: new ObjectId(req.body.feedbackId) });
    res.send({ feedbackId: req.body.feedbackId });
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;

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

module.exports = router;

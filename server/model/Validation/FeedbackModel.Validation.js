const joi = require("@hapi/joi");

const feedbackValidation = (data) => {
  const schema = {
    productId: joi.string().required(),
    rating: joi.number().required(),
    feedback: joi.string().required(),
  };
  return joi.validate(data, schema);
};

module.exports.feedbackValidation = feedbackValidation;

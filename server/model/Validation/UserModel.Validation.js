const joi = require("@hapi/joi");

const userRegisterValidation = (data) => {
  const schema = {
    username: joi.string().min(6).max(255).required(),
    address: joi.string().min(6).max(255).required(),
    email: joi.string().min(6).max(255).required().email(),
    mobile: joi.string().min(10).required(),
    password: joi.string().min(6).max(255).required(),
  };
  return joi.validate(data, schema);
};

const userLoginValidation = (data) => {
  const schema = {
    email: joi.string().min(6).max(255).required().email(),
    password: joi.string().min(6).max(255).required(),
  };
  return joi.validate(data, schema);
};

module.exports.userRegisterValidation = userRegisterValidation;
module.exports.userLoginValidation = userLoginValidation;

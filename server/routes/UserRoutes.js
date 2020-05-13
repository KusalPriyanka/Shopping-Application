const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const UserModel = require("../model/UserModel");

const {
  userRegisterValidation,
  userLoginValidation,
} = require("../model/Validation/UserModel.Validation");

router.post("/register", async (req, res) => {
  // Validation
  const { error } = userRegisterValidation(req.body);
  if (error) return res.status(404).send(error.details[0].message);

  // Check email is already used
  const emailExist = await UserModel.findOne({ userEmail: req.body.email });
  if (emailExist) return res.status(404).send("Email is already registered!");

  // Hashing password
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt);

  // Create new user
  const user = new UserModel({
    userName: req.body.username,
    userAddress: req.body.address,
    userEmail: req.body.email,
    userMobile: req.body.mobile,
    userPassword: hashPassword,
  });

  try {
    const savedUser = await user.save();
    res.send({ userId: user._id });
  } catch (err) {
    res.status(400).send(err);
  }
});

router.post("/login", async (req, res) => {
  // Validation
  const { error } = userLoginValidation(req.body);
  if (error) return res.status(404).send(error.details[0].message);

  // Check email is already used
  const user = await UserModel.findOne({ userEmail: req.body.email });
  if (!user) return res.status(404).send("Email or password is wrong!");

  // Check password
  const validPassword = await bcrypt.compare(
    req.body.password,
    user.userPassword
  );

  if (!validPassword)
    return res.status(404).send("Email or password is wrong!");

  // Create and assign token to the user
  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET, {
    expiresIn: "1h",
  });

  res.header("auth-token", token);

  res.send(token);
});

module.exports = router;

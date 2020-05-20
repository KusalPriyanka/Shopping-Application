const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  // Get token from header
  const token = req.header("auth-token");
  // Check token is there. If not return 401 error
  if (!token) return res.status(401).send("Access Denied!");

  try {
    // Verify token using jwt by passing token secret value
    const verifyToken = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = verifyToken;
    // Call next
    next();
  } catch (err) {
    // Return 400 error if token is invalid
    res.status(400).send("Invalid Token!");
  }
};

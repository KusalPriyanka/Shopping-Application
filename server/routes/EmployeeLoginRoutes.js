const router = require("express").Router();
const Employee = require("../model/Employee");
const jwt = require("jsonwebtoken");

router.post("/", async (req, res) => {
  if (!req.body.empEmail || !req.body.empPassword)
    return res.status(400).send("Please fill username and password!");

  const employee = await Employee.findOne({
    empEmail: req.body.empEmail,
    empPassword: req.body.empPassword,
  });

  if (!employee) return res.status(404).send("Email or password is wrong!");

  const token = jwt.sign(
    { _id: employee._id, userRole: employee.empType },
    process.env.TOKEN_SECRET,
    {
      expiresIn: "1h",
    }
  );

  const empObj = {
    empName: employee.empName,
    empAddress: employee.empAddress,
    empEmail: employee.empEmail,
    empContactNo: employee.empContactNo,
    empToken: token,
  };

  res.send(empObj);
});

module.exports = router;

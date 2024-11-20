const express = require("express");
const authRouter = express.Router();
const User = require("../model/userModal");
const bcrypt = require("bcrypt");

authRouter.post("/register", async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({ message: "please fill all fields" });
    }

    const isExistingUser = await User.findOne({ email: email });
    if (isExistingUser) {
      return res.status(400).json({ message: "user already exists" });
    }
    res.json({ firstName, lastName, email, password });
    const hashedPassword = await bcrypt.hash(password, 10);
    const userData = await new User({
      firstName,
      lastName,
      password: hashedPassword,
      email,
    });
    await userData.save();
    console.log("user added to db");
  } catch (err) {
    console.log(err.message);
  }
});

module.exports = authRouter;

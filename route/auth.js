const express = require("express");
const authRouter = express.Router();
const User = require("../model/userModal");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

authRouter.post("/register", async (req, res) => {
  try {
    const { firstName, lastName, email, password } = await req.body;
    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({ message: "please fill all fields" });
    }
    //console.log(email);

    const isExistingUser = await User.findOne({ email: email });
    //console.log(isExistingUser);
    if (isExistingUser) {
      return res.status(400).json({ message: "user already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    //console.log(hashedPassword);
    const userData = await new User({
      firstName,
      lastName,
      password: hashedPassword,
      email,
    });

    await userData.save();
    await res.json({ data: userData });

    console.log("user registred succesfully");
  } catch (err) {
    console.log(err.message);
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = await req.body;
    if (!email || !password) {
      res.status(401).json({ message: "please enter required fields!" });
    }

    const userData = await User.findOne({ email });
    if (!userData) {
      return res.status(401).json({
        message: "it seems you are not a registered user please login first!",
      });
    }

    const isPasswordMatch = await bcrypt.compare(password, userData.password);
    if (!isPasswordMatch) {
      return res
        .status(401)
        .json({ message: "please enter correct credentials" });
    }

    const token = await jwt.sign({ _id: userData._id }, "surendrad2731", {
      expiresIn: "1d",
    });
    //console.log(token);
    res.cookie("token", token);
    res.json({
      message: `${userData.firstName} logged in succesfully`,
      token,
      firstName: userData.firstName,
      lastName: userData.lastName,
    });
  } catch (err) {
    console.log(err.message);
  }
});

authRouter.post("/logout", async (req, res) => {
  await res.cookie("token", null, { expires: new Date(Date.now()) });
  res.send("user logged out");
});

module.exports = authRouter;

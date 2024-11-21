const express = require("express");
const mongoose = require("mongoose");
const authRouter = require("./route/auth");
const jobRouter = require("./route/job");
const cookieParser = require("cookie-parser");
const app = express();

app.use(express.json());
app.use(cookieParser());

mongoose
  .connect(
    "mongodb+srv://surendrasaluru:surendrad2731@cluster0.jgfql.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    console.log("database connected succesfully");
  })
  .catch((err) => {
    console.log(err.message);
  });
app.get("/health", async (req, res) => {
  res.json({ message: " server is all going good", time: new Date() });
});

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/job", jobRouter);

app.listen(7000, (req, res) => {
  console.log("app is running on port 7000");
});

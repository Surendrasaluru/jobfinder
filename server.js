const express = require("express");
const app = express();

app.get("/health", async (req, res) => {
  res.json({ message: " server is all going good", time: new Date() });
});

app.listen(7000, (req, res) => {
  console.log("app is running on port 7000");
});

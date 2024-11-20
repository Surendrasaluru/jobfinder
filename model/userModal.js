const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true, //check
    minLength: 4,
    maxLength: 30,
  },
  lastName: {
    type: String,
    required: true, //check
    minLength: 4,
    maxLength: 30,
  },
  email: {
    type: String,
    lowercase: true, //email should be always in lower case.
    required: true, //check
    unique: true,
    trim: true, //trimming all extra spaces.
  },
  password: {
    type: String,
    required: true,
    minLength: 4,
  },
});

const User = mongoose.model("User", userSchema); // creating model with name User.

module.exports = User; // exporting

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true,

  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ["student", "instructor"],
    default: "student"

  },
  profileImage: {
    type: String,
    default: "./assets/avatar.png",

  },
  isActive: {
    type: Boolean,
    default: true
  },

}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
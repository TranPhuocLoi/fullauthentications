const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter your name"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Please enter your email"],
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Please enter your password"],
      trim: true,
    },
    role: {
      type: Number,
      default: 0, //User 0, admin 1
    },
    avatar: {
      type: String,
      default:
        "https://drive.google.com/file/d/1DYUM9eRdjxVPcGQJlIwxSh8xP4XEHBR_/edit",
    },
  },
  {
    timeStamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);

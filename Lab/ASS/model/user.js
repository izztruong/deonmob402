const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  hoten: {
    type: String,
  },
  avatar: {
    type: String,
  },
  quyen: {
    type: String,
  },
});

const UserModel = new mongoose.model("user", UserSchema);

module.exports = UserModel;

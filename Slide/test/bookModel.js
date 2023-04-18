const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema({
  tensach: {
    type: String,
  },
  anhbia: {
    type: String,
  },
  namxuatban: {
    type: Number,
  },
  giaban: {
    type: Number,
  },
  //   _id: {
  //     type: String,
  //   },
});
const BookModel = new mongoose.model("book", BookSchema);
module.exports = BookModel;

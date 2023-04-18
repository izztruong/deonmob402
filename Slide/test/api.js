var express = require("express");
var router = express.Router();
var bm = require("./bookModel");

router.get("/", async (req, res, next) => {
  try {
    let list = await bm.find();
    if (list) {
      return res
        .status(200)
        .json({ data: list, msg: "lấy dữ lieuj thành công" });
    } else {
      return res.status(204).json({ msg: "ko có dữ liệu" });
    }
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
});
router.get("/:id", async (req, res) => {
  try {
    const user = await bm.findById(req.params.id);
    if (user == null) {
      return res.status(404).json({ message: "Không tìm thấy sách." });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
router.post("/add", async (req, res) => {
  try {
    const book = req.body;
    const item = new bm(book);
    let new_b = await item.save();
    return res.status(201).json({ book: new_b });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: error.message });
  }
});
router.post("/edit/:_id", async (req, res) => {
  try {
    let book = await bm.findOne({ _id: req.params._id });
    if (book == null) {
      return res.status(404).json({ message: "Không tìm thấy sách." });
    }
    if (book) {
      book.tensach = req.body.tensach || book.tensach;
      book.anhbia = req.body.anhbia || book.anhbia;
      book.namxuatban = req.body.namxuatban || book.namxuatban;
      book.giaban = req.body.giaban || book.giaban;
      let new_b = await book.save();
      return res.status(201).json({ book: new_b });
    } else {
      return res.status(204).json({ msg: "ko có dữ liệu" });
    }
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
});
router.get("/xoa/:_id", async function (req, res) {
  try {
    await bm.deleteOne({ _id: req.params._id });
    return res.status(204).json({ msg: "Xóa thành công" });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
});
module.exports = router;

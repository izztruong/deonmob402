const express = require("express");
const app = express();
const mongoose = require("mongoose");
const port = 3000;
const expressHbs = require("express-handlebars");
const api = require("./api");
const uri =
  "mongodb+srv://thaitqph27970:9WYpni3DM6yjxkle@cluster0.gougcmm.mongodb.net/thaitqph27970?retryWrites=true&w=majority";
const bodyParser = require("body-parser");
mongoose.connect(uri).then(console.log("ket noi db thanh cong"));
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "hbs");
app.engine(
  ".hbs",
  expressHbs.engine({
    extname: "hbs",
  })
);
app.use("/api", api);
const bookModel = require("./bookModel");
app.get("/", async (req, res) => {
  let arrbook = await bookModel.find().sort({ giaban: 1 });

  res.render("main", {
    layout: "home",
    listbook: arrbook.map((book) => book.toObject()),
    list: true,
  });
});
app.get("/formAdd", (req, res) => {
  res.render("addOrEdit", {
    layout: "home",
    title: "Thêm sách",
    add: true,
    edit: false,
  });
});
app.get("/formEdit/:_id", async (req, res) => {
  try {
    let book = await bookModel.findOne({ _id: req.params._id });
    console.log(book);
    res.render("addOrEdit", {
      layout: "home",
      title: "Edit sách",
      item: book.toObject(),
      add: false,
      edit: true,
    });
  } catch (error) {
    console.log(error);
  }
});
app.post("/add", async (req, res) => {
  console.log("add");
  try {
    const book = req.body;
    const item = new bookModel(book);
    await item.save();
    res.redirect("/");
  } catch (error) {
    console.log(error);
  }
});
app.post("/edit", async (req, res) => {
  console.log("edit");
  try {
    let book = await bookModel.findOne({ _id: req.body._id });
    if (book) {
      book.tensach = req.body.tensach;
      book.anhbia = req.body.anhbia;
      book.namxuatban = req.body.namxuatban;
      book.giaban = req.body.giaban;
      await book.save();
      res.redirect("/");
    } else {
      res.redirect("/");
    }
  } catch (error) {
    console.log(error);
  }
});
app.post("/xoa/:_id", async (req, res) => {
  console.log("xóa");
  try {
    await bookModel.deleteOne({ _id: req.params._id });
    res.redirect("/");
  } catch (error) {
    console.log(error);
  }
});
app.post("/search", async (req, res) => {
  console.log(req.body.sach);
  if (req.body.sach === "") {
    res.redirect("/");
  } else {
    let arrbook = await bookModel.find();
    let tensach = req.body.sach;
    let data = arrbook.filter((item) => {
      return item.tensach.toLowerCase() === tensach.toLowerCase();
    });
    console.log(data);
    res.render("main", {
      layout: "home",
      listbook: data.map((item) => item.toObject()),
      list: true,
    });
  }
});
app.listen(port);

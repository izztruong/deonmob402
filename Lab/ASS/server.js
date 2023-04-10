const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = 3000;
const expressHbs = require("express-handlebars");
const spController = require("./Controller/sanPhamController");
const userController = require("./Controller/userController");
const uri =
  "mongodb+srv://thaitqph27970:9WYpni3DM6yjxkle@cluster0.gougcmm.mongodb.net/thaitqph27970?retryWrites=true&w=majority";
var bodyParser = require("body-parser");
const e = require("express");
mongoose.connect(uri).then(console.log("Ket noi DB thanh cong."));

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", ".hbs");

app.engine(
  ".hbs",
  expressHbs.engine({
    extname: "hbs",
  })
);

app.use("/sanpham", spController);
app.use("/user", userController);

app.get("/", (req, res) => {
  res.render("home", {
    layout: "dangnhap",
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

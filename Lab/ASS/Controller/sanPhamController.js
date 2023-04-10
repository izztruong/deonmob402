const express = require("express");
const app = express();
const sanPhamModel = require("../model/sanpham");
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", async (req, res) => {
  let arrsp = await sanPhamModel.find();
  res.render("home", {
    layout: "sanpham",
    listsp: arrsp.map((sanpham) => sanpham.toObject()),
  });
});

app.get("/formAdd", (req, res) => {
  res.render("home", {
    title: "Thêm sản phẩm",
    layout: "themsp",
    add: true,
    edit: false,
  });
});
app.post("/add", async (req, res) => {
  console.log("add sp");
  const sp = req.body;
  console.log(sp.masp);
  const items = new sanPhamModel(sp);
  try {
    console.log(items);
    await items.save();
    res.redirect("/sanpham");
  } catch (error) {
    console.log(error);
  }
});

app.get("/formEdit/:masp", async (req, res) => {
  try {
    let spedit = await sanPhamModel.findOne({ masp: req.params.masp });
    console.log(spedit.masp);
    res.render("home", {
      title: "Edit sản phẩm",
      layout: "themsp",
      itemsp: spedit.toObject(),
      edit: true,
      add: false,
    });
  } catch (error) {
    console.log(error);
  }
});
app.post("/edit", async (req, res) => {
  console.log("edit sp");
  try {
    let sp = await sanPhamModel.findOne({ masp: req.body.masp });
    if (sp) {
      sp.tensp = req.body.tensp;
      sp.dongia = req.body.dongia;
      sp.hinhanh = req.body.hinhanh;
      sp.mausac = req.body.mausac;
      sp.loaisp = req.body.loaisp;
      sp.makh = req.body.makh;
      sp.tenkh = req.body.tenkh;
      await sp.save();
      res.redirect("/sanpham");
    } else {
      res.redirect("/sanpham");
    }
  } catch (error) {
    console.log(error);
  }
});
app.post("/xoa/:masp", async (req, res) => {
  try {
    console.log("xóa sp");
    await sanPhamModel.deleteOne({ masp: req.params.masp });
    res.redirect("/sanpham");
  } catch (error) {
    console.log(error);
  }
});

module.exports = app;

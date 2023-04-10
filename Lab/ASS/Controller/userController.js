const express = require("express");
const app = express();
const UserModel = require("../model/user");
const bodyParser = require("body-parser");
let quyeni = false;

app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", async (req, res) => {
  let arruser = await UserModel.find();
  console.log(arruser.quyen);

  console.log(quyeni);
  res.render("home", {
    layout: "user",
    listuser: arruser.map((user) => user.toObject()),
    quyen: quyeni,
    mess: !quyeni,
  });
});

app.get("/formDangki", (req, res) => {
  res.render("home", {
    layout: "dangki",
  });
});

app.get("/formDangnhap", (req, res) => {
  res.render("home", {
    layout: "dangnhap",
  });
});

app.post("/dangki", async (req, res) => {
  try {
    console.log("dangki");
    const user = req.body;

    const items = new UserModel({
      email: user.email,
      password: user.password,
      hoten: user.hoten,
      avatar: user.avatar,
    });
    items.quyen = "US";

    console.log(items);
    await items.save();
    res.redirect("/user/formDangnhap");
  } catch (error) {
    console.log(error);
  }
});
app.post("/dangnhap", async (req, res) => {
  console.log("dangnhap");
  let user = await UserModel.findOne({ email: req.body.email });
  console.log(user);

  if (!user) {
    console.log("user not found");
    res.render("home", {
      layout: "dangnhap",
      mess: "user not found",
    });
  } else {
    console.log("ok");

    if (req.body.password === user.password) {
      if (user.quyen !== "US") {
        quyeni = true;
      } else {
        quyeni = false;
      }
      res.redirect("/sanpham");
    } else {
      res.render("home", {
        layout: "dangnhap",
        mess: "sai mật khẩu",
      });
    }
  }
});
app.get("/formEdit/:_id", async (req, res) => {
  try {
    let userEdit = await UserModel.findOne({ _id: req.params._id });
    console.log(userEdit._id);
    res.render("home", {
      layout: "edituser",
      itemuser: userEdit.toObject(),
    });
  } catch (error) {}
});
app.post("/xoa/:_id", async (req, res) => {
  console.log("xóa");
  try {
    console.log("xóa user");
    await UserModel.deleteOne({ _id: req.params._id });
    res.redirect("/user");
  } catch (error) {
    console.log(error);
  }
});
app.post("/edit", async (req, res) => {
  console.log("edit user");
  try {
    let user = await UserModel.findOne({ _id: req.body._id });
    if (user) {
      user.hoten = req.body.hoten;
      user.email = req.body.email;
      user.password = req.body.password;
      user.avatar = req.body.avatar;
      user.quyen = req.body.quyen;

      await user.save();
      res.redirect("/user");
    } else {
      res.redirect("/user");
    }
  } catch (error) {
    console.log(error);
  }
});
module.exports = app;

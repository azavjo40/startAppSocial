const User = require("../models/auth");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
const fs = require("fs");
const token = require("../midlleware/token");

module.exports.register = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        message: "Incorrect register  data",
      });
    }
    const file = req.file;
    const { name, email, password, country } = req.body;
    const candidate = await User.findOne({ email });
    if (candidate) {
      return res.status(400).json({ message: "This user already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = new User({
      name,
      email,
      password: hashedPassword,
      country,
      imageSrc: file ? file.path : "uploads//spare//1617104631234-user.png",
      banner: "uploads//spare//1617104683862-aavva.png",
    });
    await user.save();
    const tokenUser = token(user._id);
    res.status(201).json({
      ...user,
      token: `Bearer ${tokenUser()}`,
      userId: user._id,
      message: "User created",
    });
  } catch (e) {
    res.status(500).json({ message: "Something went wrong, please try again" });
  }
};

module.exports.login = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty) {
      return res.status(400).json({
        errors: errors.array(),
        message: "Incorrect registration data",
      });
    }
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ message: "Invalid password, please try again" });
    }
    const tokenUser = token(user._id);
    res
      .status(200)
      .json({ ...user, token: `Bearer ${tokenUser()}`, userId: user._id });
  } catch (e) {
    res.status(500).json({ message: "Something went wrong, please try again" });
  }
};

module.exports.getUserPage = async (req, res) => {
  try {
    const _id = req.params.userId;
    if (!_id) {
      res
        .status(400)
        .json({ message: "Something went wrong, please try again" });
    }
    const user = await User.findById({ _id });
    res.status(200).json({ ...user });
  } catch (e) {
    res.status(500).json({ message: "Something went wrong, please try again" });
  }
};

module.exports.refreshToken = async (req, res) => {
  try {
    const id = req.body.userId;
    const tokenUser = await token(id);
    res.status(200).json({ token: `Bearer ${tokenUser()}`, userId: id });
  } catch (e) {
    res.status(500).json({ message: "Something went wrong, please try again" });
  }
};

module.exports.userChangeAvatar = async (req, res) => {
  try {
    const { imageSrcAvatar, name, country, _id, email } = req.body;
    const ubdate = {
      name,
      country,
      imageSrc: req.file ? req.file.path : imageSrcAvatar,
    };
    const user = await User.findOne({ email });
    if (req.file) {
      await User.findByIdAndUpdate({ _id }, { $set: ubdate }, { new: true });
      res.status(200).json({ ...user });
      if (imageSrcAvatar !== "uploads//spare//1617104631234-user.png") {
        const path = imageSrcAvatar.replace("uploadsad", "uploads/ad");
        path && fs.unlinkSync(path);
      }
    } else {
      await User.findByIdAndUpdate({ _id }, { $set: ubdate }, { new: true });
      res.status(200).json({ ...user });
    }
  } catch (e) {
    console.log(e);
  }
};

module.exports.userChangeBanner = async (req, res) => {
  try {
    const { banner, _id, email } = req.body;
    const ubdate = {
      banner: req.file ? req.file.path : banner,
    };
    const user = await User.findOne({ email });
    if (req.file) {
      await User.findByIdAndUpdate({ _id }, { $set: ubdate }, { new: true });
      res.status(200).json({ ...user });
      if (banner !== "uploads//spare//1617104683862-aavva.png") {
        const path = banner.replace("uploadsad", "uploads/ad");
        path && fs.unlinkSync(path);
      }
    } else {
      await User.findByIdAndUpdate({ _id }, { $set: ubdate }, { new: true });
      res.status(200).json({ ...user });
    }
  } catch (e) {
    console.log(e);
  }
};

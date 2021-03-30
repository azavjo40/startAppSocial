const User = require("../models/auth");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
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
    const { name, phone, email, password, country } = req.body;
    const candidate = await User.findOne({ email });
    if (candidate) {
      return res.status(400).json({ message: "This user already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = new User({
      name,
      phone,
      email,
      password: hashedPassword,
      country,
      imageSrc: file ? file.path : "uploads//spare//1617104631234-user.png",
      banner: "uploads//spare//1617104683862-aavva.png",
    });
    await user.save();
    const tokenUser = token(user.id);
    res.status(201).json({
      ...user,
      token: `Bearer ${tokenUser()}`,
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
    const tokenUser = token(user.id);
    res.status(200).json({ ...user, token: `Bearer ${tokenUser()}` });
  } catch (e) {
    res.status(500).json({ message: "Something went wrong, please try again" });
  }
};

module.exports.getUserPage = async (req, res) => {
  try {
    const _id = req.params.userId;
    console.log(_id);
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

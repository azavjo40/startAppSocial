const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  name: { type: String },
  email: { type: String },
  password: { type: String },
  imageSrc: { type: String },
  country: { type: String },
  banner: { type: String },
  date: { type: Date, default: Date.now },
});
module.exports = model("User", userSchema);

const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  imageSrc: { type: String, required: true },
  country: { type: String },
  date: { type: Date, default: Date.now },
});
module.exports = model("User", userSchema);

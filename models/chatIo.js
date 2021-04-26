const { Schema, model } = require("mongoose")

const chatIo = new Schema({
  name: { type: String },
  message: { type: String },
  chatId: [],
  // user: [{ type: Schema.Types.ObjectId, ref: "User" }],
  date: { type: Date, default: Date.now },
})
module.exports = model("Chat", chatIo)

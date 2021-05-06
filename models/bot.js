const { Schema, model } = require("mongoose")

const bot = new Schema({
  name: { type: String },
  ifWrote: { type: String },
  answer: { type: String },
  botId: { type: String },
  date: {},
})
module.exports = model("Bot", bot)

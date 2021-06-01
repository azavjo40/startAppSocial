const { Schema, model } = require('mongoose')

const bot = new Schema({
  name: { type: String },
  ifWrote: { type: String },
  message: { type: String },
  botId: { type: String },
})
module.exports = model('Bot', bot)

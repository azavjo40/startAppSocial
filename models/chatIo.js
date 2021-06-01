const { Schema, model } = require('mongoose')

const chatIo = new Schema({
  name: { type: String },
  message: { type: String },
  chatId: { type: String },
  unread: { type: String },
  user: { type: String },
  date: { type: Date },
})
module.exports = model('Chat', chatIo)

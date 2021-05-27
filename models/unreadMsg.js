const { Schema, model } = require('mongoose')

const unreadMsg = new Schema({
  chatId: { type: String },
  unread: { type: String },
})
module.exports = model('unreadMsg', unreadMsg)

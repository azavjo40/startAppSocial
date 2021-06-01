const { Schema, model } = require('mongoose')

const ChatHistory = new Schema({
  user: { type: Object },
  unitedId: [String],
})
module.exports = model('ChatHistory', ChatHistory)

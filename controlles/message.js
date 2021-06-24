const People = require('../models/auth')
const Chat = require('../models/chatIo')
const ChatHistory = require('../models/chatHistory')

module.exports.searchPeople = async (req, res) => {
  try {
    const peoples = await People.find()
    res.status(200).json(peoples)
  } catch (e) {
    console.log(e)
  }
}

module.exports.getMessages = async (req, res) => {
  try {
    let chatHistory
    if (req.params.id) {
      chatHistory = await ChatHistory.find({ unitedId: req.params.id })
      if (chatHistory[0]) {
        const chats = await Chat.find({ chatId: chatHistory[0]._id })
        res.status(200).json(chats)
      }
    }
  } catch (e) {
    console.log(e)
  }
}

module.exports.unreadMsgRead = async (req, res) => {
  try {
    const result = req.body
    if (result) {
      result.filter(async (item) => {
        const chat = await Chat.findByIdAndUpdate(
          { _id: item },
          { $set: { unread: 'ok' } },
          { new: true }
        )
      })
      res.status(200)
    }
  } catch (e) {
    console.log(e)
  }
}

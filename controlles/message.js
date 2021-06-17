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

module.exports.chatHistory = async (req, res) => {
  try {
    const userId = req.body.userId
    if (req.params.id) {
      const chatHistory = await ChatHistory.find({ unitedId: req.params.id })
      if (chatHistory[0]) {
        const chats = await Chat.find({ chatId: chatHistory[0]._id })
        const unreadMsg = []
        chats.filter((item) => {
          if (item.unread === 'true' && userId !== item.user) {
            unreadMsg.push(item)
          }
        })
        console.log(unreadMsg.length)
        res.status(200).json({ unreadMsg: unreadMsg.length })
      }
    }
  } catch (e) {
    console.log(e)
  }
}

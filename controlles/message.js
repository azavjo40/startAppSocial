const People = require('../models/auth')
const Chat = require('../models/chatIo')
const UnreadMsg = require('../models/unreadMsg')
module.exports.searchPeople = async (req, res) => {
  try {
    const peoples = await People.find()
    res.status(200).json(peoples)
  } catch (e) {
    console.log(e)
  }
}

module.exports.chatRest = async (req, res) => {
  try {
    const chats = await Chat.find({ chatId: req.params.id })
    res.status(200).json(chats)
  } catch (e) {
    console.log(e)
  }
}

module.exports.unreadMsg = async (req, res) => {
  try {
    const { chatId, unread } = req.body
    const ubdate = {
      unread,
      chatId,
    }
    const findUnread = await UnreadMsg.find(chatId)
    if (!findUnread) {
      const unraedMsg = await UnreadMsg({ chatId, unread })
      res.status(201)
    } else {
      await UnreadMsg.findByIdAndUpdate(
        { chatId },
        { $set: ubdate },
        { new: true }
      )
      res.status(200)
    }
  } catch (e) {
    console.log(e)
  }
}

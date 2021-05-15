const People = require("../models/auth")
const Chat = require("../models/chatIo")
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

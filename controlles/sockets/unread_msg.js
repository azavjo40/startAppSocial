const ChatHistory = require('../../models/chatHistory')
const Chat = require('../../models/chatIo')
const unread_mg = (socket, io) => {
  try {
    socket.on('unreadMsg', async ({ data }) => {
      const unitedId = `${data.userId}-${data.interlocutor}`
      if (unitedId) {
        const chatHistory = await ChatHistory.find({
          unitedId,
        })
        if (chatHistory[0]) {
          const chats = await Chat.find({ chatId: chatHistory[0]._id })
          const unreadMsg = []
          chats.filter((item) => {
            if (item.unread === 'true' && data.userId !== item.user) {
              unreadMsg.push(item)
            }
          })
          if (unreadMsg.length > 0) {
            io.emit(`unreadMsg${data.interlocutor}${data.userId}`, {
              unreadMsg: unreadMsg.length,
            })
          }
        }
      }
    })
  } catch (e) {
    console.log(e)
  }
}
module.exports = unread_mg

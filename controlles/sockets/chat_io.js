const Chat = require('../../models/chatIo')
const ChatHistory = require('../../models/chatHistory')
const chat_io = (socket, io) => {
  try {
    socket.on('message', async ({ form }) => {
      let chatHistory = await ChatHistory.find({
        unitedId: `${form.userId}-${form.interlocutor._id}`,
      })
      if (!chatHistory[0]) {
        chatHistory = await new ChatHistory({
          user: [{ _id: form.userId }, { _id: form.interlocutor._id }],
          unitedId: [
            `${form.userId}-${form.interlocutor._id}`,
            `${form.interlocutor._id}-${form.userId}`,
          ],
        }).save()
      }
      chatHistory = await ChatHistory.find({
        unitedId: `${form.userId}-${form.interlocutor._id}`,
      })
      if (chatHistory[0]) {
        const chat = await new Chat({
          message: form.message,
          name: form.name,
          date: Date.now(),
          chatId: chatHistory[0]._id,
          user: form.userId,
          unread: true,
        }).save()
        io.emit(`message`, { chatResult: chat })
      }
    })
  } catch (e) {
    console.log(e)
  }
}
module.exports = chat_io

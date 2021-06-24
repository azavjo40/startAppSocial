const Bot = require('../../models/bot')
const ChatHistory = require('../../models/chatHistory')
const Chat = require('../../models/chatIo')
const bot_io = (socket, io) => {
  try {
    socket.on('message', async ({ form }) => {
      let chatHistory = await ChatHistory.find({
        unitedId: `${form.userId}-${form.interlocutor._id}`,
      })
      const bot = await Bot.find({ botId: form.interlocutor._id })
      if (bot) {
        bot.filter(async (item) => {
          if (item.ifWrote.toLowerCase() === form.message.toLowerCase()) {
            const chatBot = await new Chat({
              message: item.message,
              name: item.name,
              date: Date.now(),
              chatId: chatHistory[0]._id,
              user: form.userId,
              unread: true,
            }).save()
            setTimeout(() => io.emit('message', { chatResult: chatBot }), 3000)
          }
        })
      }
    })
  } catch (e) {
    console.log(e)
  }
}
module.exports = bot_io

const Chat = require('../../models/chatIo')
const User = require('../../models/auth')
const Bot = require('../../models/bot')
const ChatHistory = require('../../models/chatHistory')

const chatIo = (http) => {
  const io = require('socket.io')(http, {
    cors: {
      origins: ['http://localhost:5000'],
    },
  })
  return async () => {
    try {
      io.on('connection', async (socket) => {
        socket.on('message', async ({ form }) => {
          ///
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
          ///
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
            io.emit('message', { chatResult: chat })
          }
          ///

          // change bot
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
                setTimeout(() => {
                  io.emit('message', { chatResult: chatBot })
                }, 3000)
              }
            })
          }
          //
        })
      })
    } catch (e) {
      console.log(e)
    }
  }
}
module.exports = chatIo

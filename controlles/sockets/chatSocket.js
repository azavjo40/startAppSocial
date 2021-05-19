const Chat = require('../../models/chatIo')
const User = require('../../models/auth')
const Bot = require('../../models/bot')
const chatIo = (http) => {
  const io = require('socket.io')(http, {
    cors: {
      origins: ['http:azam-app-tj-js.pl'],
    },
  })
  return async () => {
    try {
      io.on('connection', async (socket) => {
        await socket.on('message', async ({ form }) => {
          const chatId = [
            `${form.interlocutor._id}-${form.userId}`,
            `${form.userId}-${form.interlocutor._id}`,
          ]
          const user = await User.findById({ _id: form.userId })

          if (user) {
            const chat = await new Chat({
              message: form.message,
              name: form.name,
              date: Date.now(),
              chatId,
            }).save()
            io.emit('message', { chatResult: chat })
            const bot = await Bot.find({ botId: form.interlocutor._id })
            if (bot) {
              bot.filter(async (item) => {
                if (item.ifWrote.toLowerCase() === form.message.toLowerCase()) {
                  const chatBot = await new Chat({
                    message: item.message,
                    name: item.name,
                    date: Date.now(),
                    chatId,
                  }).save()
                  await io.emit('message', { chatResult: chatBot })
                }
              })
            }
          }
        })
      })
    } catch (e) {
      console.log(e)
    }
  }
}
module.exports = chatIo

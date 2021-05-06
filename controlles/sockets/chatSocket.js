const Chat = require("../../models/chatIo")
const User = require("../../models/auth")
const chatIo = http => {
  const io = require("socket.io")(http, {
    cors: {
      origins: ["http://localhost:5000"],
    },
  })
  return async () => {
    try {
      io.on("connection", async socket => {
        await socket.on("message", async ({ form }) => {
          const chatId = [
            `${form.interlocutor._id}-${form.userId}`,
            `${form.userId}-${form.interlocutor._id}`,
          ]
          if (form.userId) {
            const user = await User.findById({ _id: form.userId })
            if (user) {
              const chat = new Chat({
                message: form.message,
                name: form.name,
                chatId,
              })
              await chat.save()
              await io.emit("message", { chatResult: chat })
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

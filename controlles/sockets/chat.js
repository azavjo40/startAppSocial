const Chat = require("../../models/chatIo")
const chatIo = http => {
  const io = require("socket.io")(http, {
    cors: {
      origins: ["http://localhost:5000"],
    },
  })
  return async () => {
    try {
      console.log("Socket is connection")
      io.on("connection", async socket => {
        await socket.on("message", async ({ mes }) => {
          console.log(mes)
          const chat = new Chat({
            message: mes.message,
            name: mes.name,
            chatId: mes.chatId,
          })
          await chat.save()
          const chatResult = await Chat.find({ chatId: mes.chatId })
          io.emit("message", { chatResult })
        })
      })
    } catch (e) {
      console.log(e)
    }
  }
}
module.exports = chatIo

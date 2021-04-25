const chatIo = require("../controlles/sockets/chat")
const socketIo = http => {
  return async () => {
    try {
      await chatIo(http)()
    } catch (e) {
      console.log(e)
    }
  }
}
module.exports = socketIo

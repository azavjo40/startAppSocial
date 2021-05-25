const chatSocket = require('../controlles/sockets/chatSocket')
const socketIo = (http) => {
  return () => {
    try {
      console.log('Socket is connection')
      chatSocket(http)()
    } catch (e) {
      console.log(e)
    }
  }
}
module.exports = socketIo

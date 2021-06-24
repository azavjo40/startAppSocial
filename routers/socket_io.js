const chat_io = require('../controlles/sockets/chat_io')
const bot_io = require('../controlles/sockets/bot_io')
const unread_msg = require('../controlles/sockets/unread_msg')
const socket_io = (http) => {
  const io = require('socket.io')(http, {
    cors: {
      origins: ['http://localhost:5000'],
    },
  })
  return async () => {
    try {
      console.log('Socket is connection')
      io.on('connection', async (socket) => {
        await chat_io(socket, io)
        await bot_io(socket, io)
        await unread_msg(socket, io)
      })
    } catch (e) {
      console.log(e)
    }
  }
}
module.exports = socket_io

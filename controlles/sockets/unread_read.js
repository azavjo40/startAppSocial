const Chat = require('../../models/chatIo')
const unread_read = (socket) => {
  try {
    socket.on(`unred_read`, async ({ id }) => {
      await Chat.findByIdAndUpdate(
        { _id: id },
        { $set: { unread: 'ok' } },
        { new: true }
      )
    })
  } catch (e) {
    console.log(e)
  }
}
module.exports = unread_read

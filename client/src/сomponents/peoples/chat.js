import React, { useEffect } from "react"
import Icon from "@material-ui/core/Icon"
import Button from "@material-ui/core/Button"
import close from "../../images/close-window.png"
import "../../styles/peoples/chat.css"
import io from "socket.io-client"
function Chat({ setShowChat, showChat, count }) {
  const socket = io.connect("http://localhost:5000/")
  const chatHandler = () => {
    const mes = { message: "hello", name: "Adam", chatId: count }
    socket.emit("message", { mes })
  }

  useEffect(() => {
    socket.on("message", ({ chatResult }) => {
      console.log(chatResult)
    })
  })
  return (
    <div className='containerChat'>
      <div className='infoPeople'>
        <span>Azam</span>
        <img src={close} alt='close' onClick={() => setShowChat(!showChat)} />
      </div>
      <div className='chatPeople'></div>
      <form>
        <textarea name='text'></textarea>
        <Button
          onClick={chatHandler}
          variant='contained'
          color='primary'
          endIcon={<Icon>send</Icon>}
        >
          Send
        </Button>
      </form>
    </div>
  )
}
export default Chat

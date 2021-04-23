import React from "react"
import Icon from "@material-ui/core/Icon"
import Button from "@material-ui/core/Button"
import close from "../../images/close-window.png"
import "../../styles/peoples/chat.css"
function Chat({ setShowChat, showChat }) {
  return (
    <div className='containerChat'>
      <div className='infoPeople'>
        <span>Azam</span>
        <img src={close} alt='close' onClick={() => setShowChat(!showChat)} />
      </div>
      <div className='chatPeople'></div>
      <form>
        <textarea rows='10' cols='45' name='text'></textarea>
        <Button variant='contained' color='primary' endIcon={<Icon>send</Icon>}>
          Send
        </Button>
      </form>
    </div>
  )
}
export default Chat

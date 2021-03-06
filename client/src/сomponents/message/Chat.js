import { useEffect, useRef, useCallback } from 'react'
import close from '../../images/close-window.png'
import '../../styles/message/chat.css'
import io from 'socket.io-client'
import { useDispatch, useSelector } from 'react-redux'
import { InputChat, ChatCart } from '../index'
import { getMessages, showChat } from '../../redux/message/messageAcsions'
import { showUserCart } from '../../redux/userPages/userAcsions'
import { getStorage } from '../../utils/index'
function Chat() {
  const storage = getStorage()
  const socket = io.connect('http://localhost:5000')
  const interlocutor = useSelector((state) => state.peoples.interL)
  const menuRef = useRef()
  const dispatch = useDispatch()

  const closeModale = useCallback(() => {
    dispatch(showChat(false))
    dispatch(getMessages())
  }, [dispatch])

  useEffect(() => {
    const clickOutsideClose = (event) => {
      if (!menuRef.current.contains(event.target)) closeModale()
    }
    document.addEventListener('mousedown', clickOutsideClose)
    return () => document.removeEventListener('mousedown', clickOutsideClose)
  }, [dispatch, closeModale])

  const showUser = () => {
    dispatch(showChat(false))
    dispatch(showUserCart(true, interlocutor))
  }

  return (
    <div ref={menuRef} className="containerChat">
      <div className="header">
        <span>
          <img src={interlocutor.imageSrc} alt="Avatar" onClick={showUser} />
          {interlocutor.name}
        </span>
        <img src={close} alt="close" onClick={closeModale} />
      </div>
      <ChatCart socket={socket} interlocutor={interlocutor} storage={storage} />
      <InputChat
        storage={storage}
        socket={socket}
        interlocutor={interlocutor}
      />
    </div>
  )
}
export default Chat

import { useState, useEffect, useRef, useCallback } from "react"
import close from "../../images/close-window.png"
import "../../styles/peoples/chat.css"
import io from "socket.io-client"
import { LOCAL_STORAGE } from "src/constant/localstorage"
import { useDispatch, useSelector } from "react-redux"
import { InputChat, ChatCart } from "../../сomponents/index"
import {
  getMessages,
  getSoketMessage,
  showChat,
} from "src/redux/peoples/peopleAcsions"

function Chat() {
  const [mount, setMount] = useState(false)
  const storage = JSON.parse(localStorage.getItem(LOCAL_STORAGE.STORAGE_NAME))
  const socket = io.connect("http://localhost:5000/")
  const interlocutor = useSelector(state => state.peoples.interL)
  const menuRef = useRef()
  const dispatch = useDispatch()

  const chatId = [
    `${interlocutor._id}-${storage.userId}`,
    `${storage.userId}-${interlocutor._id}`,
  ]

  const closeModale = useCallback(() => {
    dispatch(showChat(false))
    dispatch(getMessages())
  }, [dispatch])

  useEffect(() => {
    if (!mount) {
      setMount(true)
      dispatch(getSoketMessage(socket))
    }
  }, [dispatch, mount, socket])

  useEffect(() => {
    const clickOutsideClose = event => {
      if (!menuRef.current.contains(event.target)) closeModale()
    }
    document.addEventListener("mousedown", clickOutsideClose)
    return () => document.removeEventListener("mousedown", clickOutsideClose)
  }, [dispatch, closeModale])
  return (
    <div ref={menuRef} className='containerChat'>
      <div className='header'>
        <span>
          <img src={interlocutor.imageSrc} alt='Avatar' /> {interlocutor.name}
        </span>
        <img src={close} alt='close' onClick={closeModale} />
      </div>
      <ChatCart socket={socket} interlocutor={interlocutor} storage={storage} />
      <InputChat storage={storage} socket={socket} chatId={chatId} />
    </div>
  )
}
export default Chat

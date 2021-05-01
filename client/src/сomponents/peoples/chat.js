import { useState, useEffect, useRef, useCallback } from "react"
import Icon from "@material-ui/core/Icon"
import Button from "@material-ui/core/Button"
import close from "../../images/close-window.png"
import "../../styles/peoples/chat.css"
import io from "socket.io-client"
import { LOCAL_STORAGE } from "src/constant/localstorage"
import { useDispatch, useSelector } from "react-redux"
import {
  getMessages,
  getSoketMessage,
  sendSoketMessage,
  showChat,
} from "src/redux/peoples/peopleAcsions"

function Chat() {
  const [mount, setMount] = useState(false)
  const storage = JSON.parse(localStorage.getItem(LOCAL_STORAGE.STORAGE_NAME))
  const [form, setForm] = useState({ name: "", message: "", chatId: "" })
  const socket = io.connect("http://localhost:5000/")
  const message = useSelector(state => state.peoples.message)
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
    const closeHandler = event => {
      if (!menuRef.current.contains(event.target)) {
        closeModale()
      }
    }
    document.addEventListener("mousedown", closeHandler)
    return () => {
      document.removeEventListener("mousedown", closeHandler)
    }
  }, [dispatch, closeModale])

  if (!message) {
    dispatch(getMessages(`${interlocutor._id}-${storage.userId}`))
  }

  const changeHandler = e => {
    e.preventDefault()
    setForm({
      ...form,
      [e.target.name]: e.target.value,
      name: storage.user.name,
      chatId,
    })
  }
  const sendMessage = e => {
    e.preventDefault()
    dispatch(sendSoketMessage(form, socket))
    setForm({ name: "", message: "", chatId: "" })
  }

  return (
    <div ref={menuRef} className='containerChat'>
      <div className='header'>
        <span>{interlocutor.name}</span>
        <img src={close} alt='close' onClick={closeModale} />
      </div>
      <div className='body'>
        {message &&
          message.map((item, i) => (
            <div key={i} className='message'>
              <span>
                {item.name} {new Date(item.date).toLocaleTimeString()}
              </span>{" "}
              <p>{item.message}</p>
            </div>
          ))}
      </div>
      <form onSubmit={sendMessage}>
        <input
          type='message'
          name='message'
          onChange={changeHandler}
          value={form.message}
          placeholder='Enter Message'
          required
        />
        <Button
          type='submit'
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

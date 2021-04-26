import { useState, useEffect } from "react"
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
} from "src/redux/peoples/peopleAcsions"

function Chat({ setShowChat, showChat, interlocutor }) {
  const storage = JSON.parse(localStorage.getItem(LOCAL_STORAGE.STORAGE_NAME))
  const [form, setForm] = useState({ name: "", message: "", chatId: "" })
  const socket = io.connect("http://localhost:5000/")
  const message = useSelector(state => state.peoples.message)
  const dispatch = useDispatch()

  const chatId = [
    `${interlocutor._id}-${storage.userId}`,
    `${storage.userId}-${interlocutor._id}`,
  ]
  useEffect(() => {
    dispatch(getSoketMessage(socket))
  }, [])

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
    <div className='containerChat'>
      <div className='infoPeople'>
        <span>{interlocutor.name}</span>
        <img
          src={close}
          alt='close'
          onClick={() => {
            setShowChat(!showChat)
            dispatch(getMessages())
          }}
        />
      </div>
      <div className='chatPeople'>
        {message &&
          message.map((item, i) => (
            <div key={i} className='itemChat'>
              <span>
                {item.name} {new Date(item.date).toLocaleTimeString()}
              </span>{" "}
              <p>{item.message}</p>
            </div>
          ))}
      </div>
      <form>
        <textarea
          name='message'
          onChange={changeHandler}
          value={form.message}
          placeholder='Enter message'
          required
        ></textarea>
        <Button
          onClick={sendMessage}
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

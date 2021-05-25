import { useEffect, useMemo, useState, useCallback } from 'react'
import '../../styles/message/chat.css'
import { useDispatch, useSelector } from 'react-redux'
import {
  getMessages,
  getSoketMessage,
} from '../../redux/message/messageAcsions'

function ChatCart({ socket, storage, interlocutor }) {
  const message = useSelector((state) => state.peoples.message)
  const msg = useMemo(() => message, [message])
  const dispatch = useDispatch()
  const [mount, setMount] = useState(false)

  const autoSendMessage = useCallback(() => {
    if (!mount) {
      setMount(true)
      dispatch(getSoketMessage(socket))
    }
  }, [dispatch, mount, socket])

  useMemo(() => autoSendMessage(), [autoSendMessage])

  useEffect(() => {
    if (!msg) {
      dispatch(getMessages(`${interlocutor._id}-${storage.userId}`))
    }
    document.title = interlocutor.name
  }, [dispatch, msg, interlocutor._id, storage.userId, interlocutor.name])

  return (
    <div className="body">
      {msg &&
        msg.reverse(false).map((item, i) => {
          return (
            <div key={i} className="message">
              <span>
                {item.name} {new Date(item.date).toLocaleTimeString()}
              </span>
              <p>{item.message}</p>
            </div>
          )
        })}
    </div>
  )
}
export default ChatCart

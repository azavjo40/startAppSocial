import { useState, useEffect, useCallback } from 'react'
import '../../styles/message/chat.css'
import { useDispatch, useSelector } from 'react-redux'
import { getMessages, getSoketMessage } from 'src/redux/message/messageAcsions'

function ChatCart({ socket, storage, interlocutor }) {
  const message = useSelector((state) => state.peoples.message)
  const [mount, setMount] = useState(false)
  const dispatch = useDispatch()

  const autoSendMessage = useCallback(() => {
    if (!mount) {
      setMount(true)
      dispatch(getSoketMessage(socket))
    }
    document.title = interlocutor.name
  }, [dispatch, mount, socket, interlocutor.name])

  useEffect(() => autoSendMessage(), [autoSendMessage])

  useEffect(() => {
    if (!message) {
      dispatch(getMessages(`${interlocutor._id}-${storage.userId}`))
    }
  }, [dispatch, message, interlocutor._id, storage.userId])

  return (
    <div className="body">
      {message &&
        message
          .reverse(() => -1)
          .map((item, i) => {
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

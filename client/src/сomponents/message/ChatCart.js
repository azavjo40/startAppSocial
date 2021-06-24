import { useEffect, useMemo, useState, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  getSoketMessage,
  unreadMsgRead,
} from '../../redux/message/messageAcsions'
import '../../styles/message/chat.css'

function ChatCart({ socket, interlocutor, storage }) {
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
    document.title = interlocutor.name
  }, [dispatch, interlocutor.name])

  useEffect(() => {
    const result = []
    msg.filter((item) => {
      if (item.unread === 'true' && item.user !== storage.userId) {
        result.push(item._id)
      }
      return item
    })
    result.length > 0 && dispatch(unreadMsgRead(result))
  }, [dispatch, msg, storage.userId])
  return (
    <div className="body">
      {msg &&
        msg.map((item, i) => {
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

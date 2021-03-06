import { useEffect, useMemo, useState, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getSoketMessage } from '../../redux/message/messageAcsions'
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
    msg.filter((item) => {
      if (item.unread === 'true' && item.user !== storage.userId) {
        socket.emit('unred_read', { id: item._id })
      }
      return item
    })
  }, [dispatch, msg, storage.userId, socket])

  return (
    <div className="body">
      <div className="body_msg">
        {msg &&
          msg.map((item, i) => {
            return (
              <div key={i} className="message">
                <span>
                  {item.name && item.name}
                  {item.date && new Date(item.date).toLocaleTimeString()}
                </span>
                <p>{item.message && item.message}</p>
              </div>
            )
          })}
      </div>
    </div>
  )
}
export default ChatCart

import { useState, useEffect } from "react"
import "../../styles/peoples/chat.css"
import { useDispatch, useSelector } from "react-redux"
import { getMessages, getSoketMessage } from "src/redux/peoples/peopleAcsions"

function ChatCart({ socket, storage, interlocutor }) {
  const [mount, setMount] = useState(false)
  const message = useSelector(state => state.peoples.message)
  const dispatch = useDispatch()

  useEffect(() => {
    if (!mount) {
      setMount(true)
      dispatch(getSoketMessage(socket))
    }
  }, [dispatch, mount, socket])

  !message && dispatch(getMessages(`${interlocutor._id}-${storage.userId}`))

  return (
    <div className='body'>
      {message &&
        message
          .sort(() => -1)
          .map((item, i) => {
            return (
              <div key={i} className='message'>
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

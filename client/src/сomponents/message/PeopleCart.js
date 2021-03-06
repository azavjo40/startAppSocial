import { useDispatch } from 'react-redux'
import { showUserCart } from '../../redux/userPages/userAcsions'
import '../../styles/message/peoples.css'
import {
  interLocutor,
  showChat,
  getMessages,
} from '../../redux/message/messageAcsions'
import { getStorage } from '../../utils'
import { useEffect, useState, useCallback } from 'react'
import io from 'socket.io-client'
function PeopleCart({ item, iconeMessage }) {
  const socket = io.connect('http://localhost:5000')
  const [countUnread, setCountUnread] = useState()
  const dispatch = useDispatch()
  const storage = getStorage()

  const unreadMsg = useCallback(() => {
    const data = {
      userId: storage.userId,
      interlocutor: item._id,
    }
    socket.emit('unreadMsg', { data })
    socket.on(`unreadMsg${item._id}${storage.userId}`, ({ unreadMsg }) => {
      setCountUnread(unreadMsg)
    })
  }, [item._id, socket, storage.userId])

  useEffect(() => {
    unreadMsg()
  }, [unreadMsg])

  const openModaleMessage = () => {
    dispatch(showChat(true))
    dispatch(interLocutor(item))
    dispatch(getMessages(`${storage.userId}-${item._id}`))
  }

  return (
    <>
      <div className="item">
        <img
          src={item.imageSrc}
          alt={item.name}
          onClick={() => dispatch(showUserCart(true, item))}
        />
        <span>{item.name}</span>
        <span className="countUnread"> {countUnread > 0 && countUnread}</span>
        <img src={iconeMessage} alt={item.name} onClick={openModaleMessage} />
      </div>
    </>
  )
}
export default PeopleCart

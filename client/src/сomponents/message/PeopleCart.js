import { useDispatch } from 'react-redux'
import { showUserCart } from '../../redux/userPages/userAcsions'
import '../../styles/message/peoples.css'
import {
  interLocutor,
  showChat,
  getMessages,
} from '../../redux/message/messageAcsions'
import { getStorage } from '../../utils'
import { useEffect } from 'react'
import { useState } from 'react'
function PeopleCart({ item, iconeMessage }) {
  const [countUnread, setCountUnread] = useState()
  const dispatch = useDispatch()
  const storage = getStorage()
  const unreadMsg = async () => {
    const form = {
      userId: storage.userId,
      interlocutor: item._id,
    }
    try {
      const option = {
        method: 'POST',
        body: JSON.stringify(form),
        headers: {
          'Content-Type': 'application/json',
          Authorization: storage.token,
        },
      }
      const data = await fetch('/api/chat/unread/msg', option)
      const json = await data.json()
      setCountUnread(json.unreadMsg)
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => unreadMsg, [unreadMsg])

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
        <span> {countUnread > 0 && countUnread}</span>
        <img src={iconeMessage} alt={item.name} onClick={openModaleMessage} />
      </div>
    </>
  )
}
export default PeopleCart

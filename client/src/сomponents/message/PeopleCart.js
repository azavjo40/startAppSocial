import { useDispatch, useSelector } from 'react-redux'
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
import { unreadMsg } from '../../utils/index'
function PeopleCart({ item, iconeMessage }) {
  const chatShow = useSelector((state) => state.peoples.chat)
  const [countUnread, setCountUnread] = useState()
  const dispatch = useDispatch()
  const storage = getStorage()

  useEffect(() => {
    if (!chatShow) {
      console.log(chatShow)
      const unreadCount = unreadMsg({
        userId: storage.userId,
        chatId: item._id,
        token: storage.token,
      })
      unreadCount.then((item) => setCountUnread(item))
    }
  }, [item._id, storage.token, storage.userId, chatShow])

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

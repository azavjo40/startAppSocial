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

function PeopleCart({ item, iconeMessage }) {
  const dispatch = useDispatch()
  const openModaleMessage = () => {
    const storage = getStorage()
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
        <img src={iconeMessage} alt={item.name} onClick={openModaleMessage} />
      </div>
    </>
  )
}
export default PeopleCart

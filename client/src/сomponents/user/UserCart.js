import '../../styles/userPage/userCart.css'
import iconeMessage from '../../images/open-message.png'
import { interLocutor, showChat } from 'src/redux/message/messageAcsions'
import { useDispatch } from 'react-redux'
import { showUserCart } from 'src/redux/userPages/userAcsions'
const UserCart = ({ userCart }) => {
  const dispatch = useDispatch()
  const openModaleMessage = () => {
    dispatch(showChat(true))
    dispatch(interLocutor(userCart))
    dispatch(showUserCart(false, null))
  }
  return (
    <div className="userCart">
      <div className="userAvatar">
        <img
          src={userCart.imageSrc && userCart.imageSrc}
          alt="Avatar"
          className="iconeAvatar"
        />
        <img
          src={iconeMessage}
          alt="Message"
          className="iconeMessage"
          onClick={openModaleMessage}
        />
      </div>
      <div className="userData">
        <p>{userCart.name && userCart.name}</p>
        <p>{userCart.country && userCart.country}</p>
        <p>{userCart.email && userCart.email}</p>
      </div>
    </div>
  )
}
export default UserCart

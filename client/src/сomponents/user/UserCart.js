import '../../styles/userPage/userCart.css'
import iconeMessage from '../../images/open-message.png'
const UserCart = ({ userCart }) => {
  return (
    <div className="userCart">
      <div className="userAvatar">
        <img
          src={userCart.imageSrc && userCart.imageSrc}
          alt="Avatar"
          className="iconeAvatar"
        />
        <img src={iconeMessage} alt="Message" className="iconeMessage" />
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

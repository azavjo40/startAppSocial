import { useDispatch } from 'react-redux'
import { showUserCart } from '../../redux/userPages/userAcsions'
import '../../styles/message/peoples.css'
import { interLocutor, showChat } from '../../redux/message/messageAcsions'

function SearchCart({ item, iconeMessage }) {
  const dispatch = useDispatch()
  const openModaleMessage = () => {
    dispatch(showChat(true))
    dispatch(interLocutor(item))
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
export default SearchCart

import React from 'react'
import '../../styles/message/peoples.css'
import { useDispatch } from 'react-redux'
import { interLocutor, showChat } from 'src/redux/message/messageAcsions'
import { showUserCart } from 'src/redux/userPages/userAcsions'
function SearchCart({ item, iconeMessage }) {
  const dispatch = useDispatch()
  return (
    <>
      <div className="item">
        <img
          src={item.imageSrc}
          alt={item.name}
          onClick={() => dispatch(showUserCart(true, item))}
        />
        <span>{item.name}</span>
        <img
          src={iconeMessage}
          alt={item.name}
          onClick={() => {
            dispatch(showChat(true))
            dispatch(interLocutor(item))
          }}
        />
      </div>
    </>
  )
}
export default SearchCart

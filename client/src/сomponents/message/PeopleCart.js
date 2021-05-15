import React from 'react'
import '../../styles/message/peoples.css'
import { useDispatch } from 'react-redux'
import { interLocutor, showChat } from 'src/redux/message/messageAcsions'
function SearchCart({ item, iconeMessage }) {
  const dispatch = useDispatch()
  return (
    <>
      <div
        className="item"
        onClick={() => {
          dispatch(showChat(true))
          dispatch(interLocutor(item))
        }}
      >
        <img src={item.imageSrc} alt={item.name} />
        <span>{item.name}</span>
        <img src={iconeMessage} alt={item.name} />
      </div>
    </>
  )
}
export default SearchCart

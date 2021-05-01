import React from "react"
import "../../styles/peoples/peoples.css"
import { useDispatch } from "react-redux"
import { interLocutor, showChat } from "src/redux/peoples/peopleAcsions"
function SearchCart({ item, iconeMessage }) {
  const dispatch = useDispatch()
  return (
    <>
      <div
        className='item'
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

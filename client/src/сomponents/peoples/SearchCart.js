import React, { useState } from "react"
import "../../styles/peoples/searchPeople.css"
import Chat from "./chat"
function SearchCart({ item, iconeMessage }) {
  const [showChat, setShowChat] = useState(false)
  return (
    <>
      <div className='item'>
        <img src={item.imageSrc} alt={item.name} />
        <span>{item.name}</span>
        <img
          src={iconeMessage}
          alt={item.name}
          onClick={() => setShowChat(!showChat)}
        />
      </div>
      {showChat && <Chat />}
    </>
  )
}
export default SearchCart

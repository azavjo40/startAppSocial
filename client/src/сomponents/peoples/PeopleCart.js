import React, { useState } from "react"
import "../../styles/peoples/peoples.css"
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
      {showChat && (
        <Chat
          setShowChat={setShowChat}
          showChat={showChat}
          interlocutor={item}
        />
      )}
    </>
  )
}
export default SearchCart

import React from "react"
import "../../styles/userPage/userData.css"
import { useSelector } from "react-redux"
function UserData() {
  const items = useSelector(state => state.userPages.user)
  return (
    <div className='containerData'>
      {items && (
        <>
          <div className='userAvatar'>
            <img src={items._doc.imageSrc} alt='Your img' />
          </div>
          <div className='userData'>
            <p>{items._doc.name}</p>
            <p>{items._doc.country}</p>
          </div>
        </>
      )}
    </div>
  )
}

export default UserData

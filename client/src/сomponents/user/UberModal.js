import { useEffect, useRef, useCallback } from 'react'
import { LOCAL_STORAGE } from 'src/constant/localstorage'
import { useDispatch, useSelector } from 'react-redux'
import close from '../../images/close-window.png'
import { showUserCart } from 'src/redux/userPages/userAcsions'
import '../../styles/userPage/userCart.css'
import UserCart from './UserCart'
const UserModal = () => {
  const storage = JSON.parse(localStorage.getItem(LOCAL_STORAGE.STORAGE_NAME))
  const userCart = useSelector((state) => state.userPages.userCart)
  const menuRef = useRef()
  const dispatch = useDispatch()
  const closeModale = useCallback(() => {
    dispatch(showUserCart(false))
  }, [dispatch])
  console.log(storage)
  useEffect(() => {
    const clickOutsideClose = (event) => {
      if (!menuRef.current.contains(event.target)) closeModale()
    }
    document.addEventListener('mousedown', clickOutsideClose)
    return () => document.removeEventListener('mousedown', clickOutsideClose)
  }, [dispatch, closeModale])
  return (
    <div ref={menuRef} className="containerUser">
      <div className="header">
        <img src={close} alt="close" onClick={closeModale} />
      </div>
      <UserCart userCart={userCart} />
    </div>
  )
}
export default UserModal

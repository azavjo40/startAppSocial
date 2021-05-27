import { useEffect, useRef, useCallback } from 'react'
import { getStorage } from '../../utils/index'
import { useDispatch, useSelector } from 'react-redux'
import close from '../../images/close-window.png'
import { showUserCart } from '../../redux/userPages/userAcsions'
import '../../styles/userPage/userCart.css'
import { UserCart, UserChangeData } from '../index'

const UserModal = () => {
  const storage = getStorage()
  const userCart = useSelector((state) => state.userPages.userCart)
  const menuRef = useRef()
  const dispatch = useDispatch()

  const closeModale = useCallback(() => {
    dispatch(showUserCart(false))
  }, [dispatch])
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
      {storage.userId === userCart._id ? (
        <UserChangeData item={userCart} />
      ) : (
        <UserCart userCart={userCart} />
      )}
    </div>
  )
}
export default UserModal

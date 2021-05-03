import { useState, useRef, useEffect } from "react"
import { NavLink } from "react-router-dom"
import icon from "../../images/openMenu.png"
import { useDispatch } from "react-redux"
import { logout } from "../../redux/auths/authAcsions"
import "../../styles/navbar/navbar.css"
import { UserData } from "../../сomponents/index"
const Navbar = props => {
  const [isLoadin, setIsLoading] = useState(false)
  const dispatch = useDispatch()
  const menuRef = useRef()

  useEffect(() => {
    const clickOutsideClose = event => {
      if (!menuRef.current.contains(event.target)) setIsLoading(false)
    }
    document.addEventListener("mousedown", clickOutsideClose)
    return () => document.removeEventListener("mousedown", clickOutsideClose)
  }, [])

  return (
    <div ref={menuRef} className='containerNavbar'>
      {props.isAuthUser && (
        <img
          src={icon}
          alt={icon}
          className='imgIcon'
          onClick={() => setIsLoading(!isLoadin)}
        />
      )}
      <div className={isLoadin ? "openMenu" : "closeMenu"}>
        <UserData />
        <ul className='navbar'>
          {props.home ? (
            <li onClick={() => setIsLoading(!isLoadin)}>
              <NavLink to={props.homeUrl ? props.homeUrl : ""}>
                {props.home}
              </NavLink>
            </li>
          ) : (
            ""
          )}
          {props.logout ? (
            <li onClick={() => setIsLoading(!isLoadin)}>
              <NavLink
                to={props.logout ? props.logoutUrl : ""}
                onClick={() => dispatch(logout())}
              >
                {props.logout}
              </NavLink>
            </li>
          ) : (
            ""
          )}
        </ul>
      </div>
    </div>
  )
}
export default Navbar

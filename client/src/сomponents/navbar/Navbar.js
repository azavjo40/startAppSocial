import { useState } from "react"
import { NavLink } from "react-router-dom"
import icon from "../../images/openMenu.png"
import { useDispatch } from "react-redux"
import { logout } from "../../redux/auths/authAcsions"
import "../../styles/navbar/navbar.css"
const Navbar = props => {
  const [isLoadin, setIsLoading] = useState(false)
  const dispatch = useDispatch()
  function handleResize() {
    if (window.innerWidth > 425) {
      setIsLoading(false)
    }
  }
  window.addEventListener("resize", handleResize)

  return (
    <header className='header'>
      <img
        src={icon}
        alt={icon}
        className='imgIcon'
        onClick={() => setIsLoading(!isLoadin)}
      />
      <ul
        className={isLoadin ? "openNav" : "nav_links"}
        onClick={() => setIsLoading(false)}
      >
        {props.home ? (
          <li>
            <NavLink to={props.h ? props.h : ""}>{props.home}</NavLink>
          </li>
        ) : (
          ""
        )}
        {props.login ? (
          <li>
            <NavLink to={props.l ? props.l : ""}>{props.login}</NavLink>
          </li>
        ) : (
          ""
        )}
        {props.myPage ? (
          <li>
            <NavLink to={props.p ? props.p : ""}>{props.myPage}</NavLink>
          </li>
        ) : (
          ""
        )}
        {props.searchPeople ? (
          <li>
            <NavLink to={props.s ? props.s : ""}>{props.searchPeople}</NavLink>
          </li>
        ) : (
          ""
        )}
        {props.logout ? (
          <li>
            <NavLink
              to={props.logout ? props.lo : ""}
              onClick={() => dispatch(logout())}
            >
              {props.logout}
            </NavLink>
          </li>
        ) : (
          ""
        )}
      </ul>
    </header>
  )
}
export default Navbar

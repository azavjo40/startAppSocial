import { useState } from "react";
import { NavLink } from "react-router-dom";
import icon from "../images/openMenu.png";
import { useDispatch } from "react-redux";
import { logout } from "../redux/auths/authAcsions";
import "../styles/navbar/navbar.css";
const Navbar = (props) => {
  const [isLoadin, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  function handleResize() {
    //  window.innerHeight
    if (window.innerWidth > 600) {
      setIsLoading(false);
    }
  }

  window.addEventListener("resize", handleResize);
  return (
    <header className="header">
      <img
        src={icon}
        alt={icon}
        className="imgIcon"
        onClick={() => setIsLoading(!isLoadin)}
      />
      <ul
        className={isLoadin ? "openNav" : "nav_links"}
        onClick={() => setIsLoading(false)}
      >
        {props.login ? (
          <li>
            <NavLink to={props.l ? props.l : ""}>{props.login}</NavLink>
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
  );
};
export default Navbar;

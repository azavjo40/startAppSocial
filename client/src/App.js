import { useEffect } from "react"
import { Navbar } from "./сomponents"
import { useRouters } from "./routers"
import { BrowserRouter as Router } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { autoLogin, refreshToken } from "./redux/auths/authAcsions"
import { getUserPage } from "./redux/userPages/userAcsions"
import "./App.css"

function App() {
  const isAuthUser = useSelector(state => state.auth.isAuthUser)
  const routers = useRouters(isAuthUser)
  const dispatch = useDispatch()

  useEffect(() => dispatch(autoLogin()), [dispatch])
  useEffect(() => isAuthUser && dispatch(refreshToken()), [
    dispatch,
    isAuthUser,
  ])
  useEffect(() => isAuthUser && dispatch(getUserPage()), [dispatch, isAuthUser])
  return (
    <div className='cont'>
      <Router>
        {isAuthUser ? (
          <Navbar
            logout='Logout'
            lo='/'
            myPage='User'
            p='/userPage'
            s='/searchPeople'
            searchPeople='Search'
          />
        ) : (
          <Navbar login='Login' l='/auth' home='Home' h='/' />
        )}
        {routers}
      </Router>
    </div>
  )
}

export default App

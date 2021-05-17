import { useEffect } from 'react'
import { Navbar } from './сomponents'
import { useRouters } from './routers'
import { BrowserRouter as Router } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { autoLogin, refreshToken } from './redux/auths/authAcsions'
import { getUserPage } from './redux/userPages/userAcsions'
import { Alert } from './сomponents/index'
import './App.css'

function App() {
  const isAuthUser = useSelector((state) => state.auth.isAuthUser)
  const alert = useSelector((state) => state.general.alert)
  const routers = useRouters(isAuthUser)
  const dispatch = useDispatch()
  useEffect(() => dispatch(autoLogin()), [dispatch])
  useEffect(() => {
    isAuthUser && dispatch(refreshToken(isAuthUser))
    isAuthUser && dispatch(getUserPage(isAuthUser))
  }, [dispatch, isAuthUser])

  return (
    <div className="appCont">
      {alert && <Alert text={alert} />}
      <div className="appBody">
        <Router>
          {isAuthUser ? (
            <Navbar
              isAuthUser={isAuthUser}
              logout="Logout"
              logoutUrl="/"
              home="Home"
              homeUrl="/home"
            />
          ) : (
            <Navbar isAuthUser={isAuthUser} />
          )}
          {routers}
        </Router>
      </div>
    </div>
  )
}

export default App

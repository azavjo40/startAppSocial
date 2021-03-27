import { useEffect } from "react";
import { Navbar } from "./сomponents";
import { useRouters } from "./routers";
import { BrowserRouter as Router } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { autoLogin, refreshToken } from "./redux/auths/authAcsions";
import "./App.css";

function App() {
  const isAuthUser = useSelector((state) => state.auth.isAuthUser);
  const authStorage = useSelector((state) => state.auth.storage);
  const routers = useRouters(isAuthUser);
  const dispatch = useDispatch();

  useEffect(() => dispatch(autoLogin(authStorage)), [dispatch, authStorage]);
  isAuthUser && dispatch(refreshToken());

  return (
    <div className="cont">
      <Router>
        {isAuthUser ? (
          <Navbar logout="Logout" lo="/" myPage="MyPage" p="/myPage" />
        ) : (
          <Navbar login="Login" l="/auth" home="Home" h="/" />
        )}
        {routers}
      </Router>
    </div>
  );
}

export default App;

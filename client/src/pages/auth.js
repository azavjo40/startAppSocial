import React, { useState } from "react";
import { Login, Register, Alert } from "../сomponents";
import { useSelector } from "react-redux";
import "../styles/auth/auth.css";
function Auth() {
  const alert = useSelector((state) => state.general.alert);
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="contAuth">
      {alert && <Alert text={alert} />}
      {isLogin ? <Login /> : <Register />}
      <button className="btnGoToRegister" onClick={() => setIsLogin(!isLogin)}>
        {isLogin ? "To Register" : "To Login"}
      </button>
    </div>
  );
}
export default Auth;

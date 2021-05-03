import React, { useState } from "react"
import { Login, Register, Alert } from "../сomponents"
import { useSelector } from "react-redux"
import "../styles/auth/auth.css"
function Auth() {
  const [isLogin, setIsLogin] = useState(true)

  return (
    <div className='contAuth'>
      {isLogin ? <Login /> : <Register />}
      <div className='switchBtn'>
        <button onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? "To Register" : "To Login"}
        </button>
      </div>
    </div>
  )
}
export default Auth

import { useState } from "react"
import { useDispatch } from "react-redux"
import { authLogin } from "../../redux/auths/authAcsions"
import "../../styles/auth/register.css"

function Login() {
  const [form, setForm] = useState({ email: "", password: "" })
  const changehandler = event => {
    setForm({ ...form, [event.target.name]: event.target.value })
  }
  const dispach = useDispatch()

  const loginHandler = e => {
    e.preventDefault()
    dispach(authLogin(form))
    setForm({ email: "", password: "" })
  }

  return (
    <form className='authForm' onSubmit={e => loginHandler(e)}>
      <input
        className='input'
        type='email'
        name='email'
        placeholder='Enter Email'
        required
        value={form.email}
        onChange={event => changehandler(event)}
      />
      <input
        className='input'
        type='passeord'
        name='password'
        placeholder='Enter Password'
        required
        value={form.password}
        onChange={event => changehandler(event)}
        autoComplete='off'
      />
      <div className='registerBtn'>
        <button type='submit'>Login</button>
      </div>
    </form>
  )
}
export default Login

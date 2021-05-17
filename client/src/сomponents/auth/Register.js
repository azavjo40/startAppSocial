import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { authRegister } from '../../redux/auths/authAcsions'
import IconButton from '@material-ui/core/IconButton'
import PhotoCamera from '@material-ui/icons/PhotoCamera'
import '../../styles/auth/register.css'
function Register() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    country: '',
  })

  const changehandler = (e) => {
    const files = e.target.files
    const file = files && files[0]
    setForm({
      ...form,
      [e.target.name]: e.target.value,
      file,
    })
  }
  const dispach = useDispatch()
  const registerHandler = (e) => {
    e.preventDefault()
    dispach(authRegister(form))
    setForm({ name: '', email: '', password: '', country: '' })
  }
  return (
    <form className="authForm" onSubmit={(e) => registerHandler(e)}>
      <input
        className="input"
        type="text"
        name="name"
        placeholder="Enter Name"
        required
        value={form.name}
        onChange={changehandler}
        autoComplete="off"
      />

      <input
        className="input"
        type="email"
        name="email"
        placeholder="Enter Email "
        required
        value={form.email}
        onChange={changehandler}
      />

      <input
        className="input"
        type="password"
        name="password"
        placeholder="Enter Password"
        required
        value={form.password}
        onChange={changehandler}
        autoComplete="off"
      />

      <input
        className="input"
        type="country"
        name="country"
        placeholder="Enter Country"
        required
        value={form.country}
        onChange={changehandler}
        autoComplete="off"
      />

      <input
        accept="image/*"
        id="icon-button-file"
        type="file"
        style={{ display: 'none' }}
        onChange={changehandler}
      />
      <label htmlFor="icon-button-file">
        <IconButton
          color="primary"
          aria-label="upload picture"
          component="span"
        >
          <PhotoCamera />
        </IconButton>
      </label>
      <div className="registerBtn">
        <button type="submit">Register</button>
      </div>
    </form>
  )
}
export default Register

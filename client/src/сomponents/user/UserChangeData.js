import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { showUserCart } from 'src/redux/userPages/userAcsions'
import { userChangeAvatar } from '../../redux/auths/authAcsions'
import '../../styles/userPage/userCart.css'
function UserChangeData({ item }) {
  const [form, setForm] = useState({
    name: item.name,
    email: item.email,
    country: item.country,
    _id: item._id,
    imageSrcAvatar: item.imageSrc,
  })
  const dispatch = useDispatch()

  const changehandlerAvatar = (e) => {
    const files = e.target.files
    const file = files && files[0]
    setForm({
      ...form,
      [e.target.name]: e.target.value,
      file,
    })
  }
  const userChangeHandler = (e) => {
    e.preventDefault()
    dispatch(userChangeAvatar(form))
    dispatch(showUserCart(false, null))
  }
  return (
    <form className="userCart" onSubmit={userChangeHandler}>
      <div className="userAvatar">
        <input
          accept="image/*"
          id="icon-button-avatar"
          type="file"
          style={{ display: 'none' }}
          onChange={changehandlerAvatar}
        />
        <label htmlFor="icon-button-avatar" className="imageUser">
          <img src={item.imageSrc} alt="change " className="iconeAvatar" />
        </label>
      </div>
      <div className="userData">
        <p>Change Data</p>
        <input
          className="input"
          type="text"
          name="name"
          placeholder="Enter Name"
          required
          value={form.name}
          onChange={changehandlerAvatar}
        />

        <input
          className="input"
          type="country"
          name="country"
          placeholder="Enter Country"
          required
          value={form.country}
          onChange={changehandlerAvatar}
        />
        <button>Save</button>
      </div>
    </form>
  )
}

export default UserChangeData

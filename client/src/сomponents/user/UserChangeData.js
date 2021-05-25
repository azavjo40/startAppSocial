import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { showUserCart } from '../../redux/userPages/userAcsions'
import { userChangeData } from '../../redux/auths/authAcsions'
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
    setForm({ ...form, file: e.target.files[0] })
  }

  const changehandlerData = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const userChangeHandler = (e) => {
    e.preventDefault()
    dispatch(userChangeData(form))
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
          onChange={changehandlerData}
        />

        <input
          className="input"
          type="country"
          name="country"
          placeholder="Enter Country"
          required
          value={form.country}
          onChange={changehandlerData}
        />
        <button>Save</button>
      </div>
    </form>
  )
}

export default UserChangeData

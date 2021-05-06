import { useEffect, useRef, useState } from "react"
import "../../styles/peoples/createBot.css"
import { LOCAL_STORAGE } from "src/constant/localstorage"
import { useDispatch } from "react-redux"
import { createBot } from "src/redux/peoples/peopleAcsions"
const CreateBot = ({ showModal, setShowMdal }) => {
  const storage = JSON.parse(localStorage.getItem(LOCAL_STORAGE.STORAGE_NAME))
  const [form, setForm] = useState({ ifWrote: "", answer: "" })
  const menuRef = useRef()
  const dispatch = useDispatch()
  const changehandler = event => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
      name: storage.user.name,
      botId: storage.userId,
    })
  }

  useEffect(() => {
    const clickOutsideClose = event => {
      if (!menuRef.current.contains(event.target)) setShowMdal(!showModal)
    }
    document.addEventListener("mousedown", clickOutsideClose)
    return () => document.removeEventListener("mousedown", clickOutsideClose)
  }, [setShowMdal, showModal])

  const sendHandler = e => {
    e.preventDefault()
    dispatch(createBot(form))
    setForm({ ifWrote: "", answer: "" })
  }
  return (
    <div className='containerBot'>
      <form ref={menuRef} className='boxBot' onSubmit={sendHandler}>
        <p onClick={() => setShowMdal(!showModal)}>+</p>
        <input
          type='text'
          placeholder='If They Wronte Before You'
          value={form.ifWrote}
          onChange={event => changehandler(event)}
          name='ifWrote'
          required
          autoComplete='off'
        />
        <input
          value={form.answer}
          name='answer'
          onChange={event => changehandler(event)}
          type='text'
          placeholder='Here The Answer Is An Answering Machine'
          required
          autoComplete='off'
        />
        <button type='submit'>Save</button>
      </form>
    </div>
  )
}
export default CreateBot

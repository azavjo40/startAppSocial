import { useEffect, useRef, useState } from 'react'
import '../../styles/bot/bot.css'
import { getStorage } from '../../utils/index'
import { useDispatch } from 'react-redux'
import { createBot, showModalBot } from '../../redux/bot/botAcsions'
import { ListBot } from '../index'
import close from '../../images/close-window.png'
const Bot = () => {
  const storage = getStorage()
  const [form, setForm] = useState({ ifWrote: '', message: '' })
  const menuRef = useRef()
  const dispatch = useDispatch()

  const changehandler = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
      name: storage.user.name,
      botId: storage.userId,
    })
  }

  useEffect(() => {
    const clickOutsideClose = (event) => {
      if (!menuRef.current.contains(event.target)) dispatch(showModalBot(false))
    }
    document.addEventListener('mousedown', clickOutsideClose)
    return () => document.removeEventListener('mousedown', clickOutsideClose)
  }, [dispatch])

  const sendHandler = (e) => {
    e.preventDefault()
    dispatch(createBot(form))
    setForm({ ifWrote: '', message: '' })
  }

  return (
    <div className="containerBot" ref={menuRef}>
      <div className="header">
        <img
          src={close}
          alt="close"
          onClick={() => dispatch(showModalBot(false))}
        />
      </div>
      <div className="itemsBots">
        <form className="boxCreateBot" onSubmit={sendHandler}>
          <div className="inoutBox">
            <input
              type="text"
              placeholder="If"
              value={form.ifWrote}
              onChange={(event) => changehandler(event)}
              name="ifWrote"
              required
              autoComplete="off"
            />
            <input
              value={form.message}
              name="message"
              onChange={(event) => changehandler(event)}
              type="text"
              placeholder="Answer"
              required
              autoComplete="off"
            />
          </div>
          <button type="submit">Save</button>
        </form>
        <ListBot />
      </div>
    </div>
  )
}
export default Bot

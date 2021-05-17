import { useEffect, useRef, useState } from 'react'
import '../../styles/bot/bot.css'
import { LOCAL_STORAGE } from 'src/constant/localstorage'
import { useDispatch } from 'react-redux'
import { createBot, getBot } from 'src/redux/bot/botAcsions'
import { ListBot } from '../index'
const Bot = ({ showModal, setShowMdal }) => {
  const storage = JSON.parse(localStorage.getItem(LOCAL_STORAGE.STORAGE_NAME))
  const [form, setForm] = useState({ ifWrote: '', message: '' })
  const [showBot, setShowBot] = useState(false)
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
      if (!menuRef.current.contains(event.target)) setShowMdal(!showModal)
    }
    document.addEventListener('mousedown', clickOutsideClose)
    return () => document.removeEventListener('mousedown', clickOutsideClose)
  }, [setShowMdal, showModal])

  const sendHandler = (e) => {
    e.preventDefault()
    dispatch(createBot(form))
    setForm({ ifWrote: '', message: '' })
    getBot(storage.userId)
  }

  return (
    <div className="containerBot">
      {showBot ? (
        <ListBot setShowBot={setShowBot} showBot={showBot} menuRef={menuRef} />
      ) : (
        <form ref={menuRef} className="boxCreateBot" onSubmit={sendHandler}>
          <span className="selectorBot" onClick={() => setShowBot(!showBot)}>
            To List Bot
          </span>
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
          <button type="submit">Save</button>
        </form>
      )}
    </div>
  )
}
export default Bot

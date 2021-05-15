import { useEffect, useRef, useState } from 'react'
import '../../styles/message/createBot.css'
import { LOCAL_STORAGE } from 'src/constant/localstorage'
import { useDispatch, useSelector } from 'react-redux'
import { createBot, getBot } from 'src/redux/bot/botAcsions'
const CreateBot = ({ showModal, setShowMdal }) => {
  const storage = JSON.parse(localStorage.getItem(LOCAL_STORAGE.STORAGE_NAME))
  const [form, setForm] = useState({ ifWrote: '', message: '' })
  const [showBot, setShowBot] = useState(false)
  const items = useSelector((state) => state.bot.items)

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

  useEffect(() => dispatch(getBot(storage.userId)), [dispatch, storage.userId])
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
        <div className="conList" ref={menuRef}>
          <span onClick={() => setShowBot(!showBot)}>To Create Bot</span>
          <div className="boxListBot">
            {items &&
              items.map((item) => (
                <p key={item._id}>
                  If : {item.ifWrote} Answer: {item.message}
                </p>
              ))}
          </div>
        </div>
      ) : (
        <form ref={menuRef} className="boxCreateBot" onSubmit={sendHandler}>
          <span onClick={() => setShowBot(!showBot)}>To List Bot</span>
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
export default CreateBot

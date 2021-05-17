import { useEffect } from 'react'
import '../../styles/bot/bot.css'
import { LOCAL_STORAGE } from 'src/constant/localstorage'
import { useDispatch, useSelector } from 'react-redux'
import { getBot, removeBot } from 'src/redux/bot/botAcsions'
const ListBot = ({ setShowBot, showBot, menuRef }) => {
  const dispatch = useDispatch()
  const storage = JSON.parse(localStorage.getItem(LOCAL_STORAGE.STORAGE_NAME))
  const items = useSelector((state) => state.bot.items)

  useEffect(() => dispatch(getBot(storage.userId)), [dispatch, storage.userId])
  const remove = (id) => dispatch(removeBot(id))
  return (
    <div className="conList" ref={menuRef}>
      <span className="selectorBot" onClick={() => setShowBot(!showBot)}>
        To Create Bot
      </span>
      <div className="boxListBot">
        {items &&
          items.map((item) => (
            <div className="listItem" key={item._id}>
              <p>
                If : {item.ifWrote} Answer: {item.message}
              </p>
              <p className="removeList" onClick={() => remove(item._id)}>
                -
              </p>
            </div>
          ))}
      </div>
    </div>
  )
}
export default ListBot

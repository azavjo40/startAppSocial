import { useEffect } from 'react'
import '../../styles/bot/bot.css'
import { getStorage } from '../../utils/index'
import { useDispatch, useSelector } from 'react-redux'
import { getBot, removeBot } from '../../redux/bot/botAcsions'
const ListBot = () => {
  const dispatch = useDispatch()
  const storage = getStorage()
  const items = useSelector((state) => state.bot.items)

  useEffect(() => dispatch(getBot(storage.userId)), [dispatch, storage.userId])
  const remove = (id) => dispatch(removeBot(id))

  return (
    <div className="boxListBot">
      {items &&
        items.map((item) => (
          <div className="boxBot" key={item._id}>
            <div className="listItem">
              <p>
                {item.ifWrote} = {item.message}
              </p>
            </div>
            <p className="removeList" onClick={() => remove(item._id)}>
              -
            </p>
          </div>
        ))}
    </div>
  )
}
export default ListBot

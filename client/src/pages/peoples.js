import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { chatHistory, getSearchPeople } from '../redux/message/messageAcsions'
import { PeopleCart, Search, Chat, UserModal, Bot } from '../сomponents'
import iconeMessage from '../images/open-message.png'
import '../styles/message/peoples.css'
function Peoples() {
  const dispatch = useDispatch()
  const chatShow = useSelector((state) => state.peoples.chat)
  const items = useSelector((state) => state.peoples.items)
  const searchItems = useSelector((state) => state.peoples.search)
  const showUser = useSelector((state) => state.userPages.showCart)
  const modalBot = useSelector((state) => state.bot.showBot)
  let resultItems
  !searchItems ? (resultItems = items) : (resultItems = searchItems)
  useEffect(() => {
    dispatch(getSearchPeople())
    dispatch(chatHistory())
  }, [dispatch])
  return (
    <div className="containerPeoples">
      <div className="beoplesBox">
        <Search items={items} />
        {resultItems &&
          resultItems.map((item) => {
            return (
              <PeopleCart
                item={item}
                key={item._id}
                iconeMessage={iconeMessage}
              />
            )
          })}
      </div>
      {chatShow && <Chat />}
      {showUser && <UserModal />}
      {modalBot && <Bot />}
    </div>
  )
}

export default Peoples

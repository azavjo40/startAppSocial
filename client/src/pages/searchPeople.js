import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getSearchPeople } from "src/redux/peoples/peopleAcsions"
import { PeopleCart, Search } from "src/сomponents"
import iconeMessage from "../images/open-message.png"

function SearchPeople() {
  const dispatch = useDispatch()
  useEffect(() => dispatch(getSearchPeople()), [dispatch])
  const items = useSelector(state => state.peoples.items)
  const searchItems = useSelector(state => state.peoples.search)
  return (
    <div className='containerPeoples'>
      <Search items={items} />
      {searchItems
        ? searchItems.map(item => {
            return (
              <PeopleCart
                item={item}
                key={item._id}
                iconeMessage={iconeMessage}
              />
            )
          })
        : items &&
          items.map(item => {
            return (
              <PeopleCart
                item={item}
                key={item._id}
                iconeMessage={iconeMessage}
              />
            )
          })}
    </div>
  )
}

export default SearchPeople

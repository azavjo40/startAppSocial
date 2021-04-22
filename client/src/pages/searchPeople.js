import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getSearchPeople } from "src/redux/peoples/peopleAcsions"
import { SearchCart } from "src/сomponents"
import iconeMessage from "../images/open-message.png"
function SearchPeople() {
  const dispatch = useDispatch()
  useEffect(() => dispatch(getSearchPeople()), [dispatch])
  const items = useSelector(state => state.peoples.items)
  return (
    <div className='containerPeoples'>
      {items &&
        items.map(item => (
          <SearchCart item={item} key={item._id} iconeMessage={iconeMessage} />
        ))}
    </div>
  )
}
export default SearchPeople

import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getSearchPeople } from "src/redux/peoples/peopleAcsions"
import { SearchCart } from "src/сomponents"
import iconeMessage from "../images/open-message.png"
function SearchPeople() {
  const dispatch = useDispatch()
  useEffect(() => dispatch(getSearchPeople()), [dispatch])
  const items = useSelector(state => state.peoples.items)

  const [filtrDatalist, setFiltrDatalist] = useState()
  const [filtrPeople, setFiltrPeople] = useState()
  const changeHandler = e => {
    const people = []
    const datalist = []

    const peo = e.target.value.trim().toLowerCase()
    items &&
      items.filter(item => {
        if (item.name.toLowerCase() === peo) {
          people.push(item)
        }
        if (item.name.toLowerCase() >= peo) {
          datalist.push(item)
        }
        return false
      })
    setFiltrDatalist(datalist)
    setFiltrPeople(people)
  }
  return (
    <div className='containerPeoples'>
      <input
        list='country'
        type='text'
        onInput={changeHandler}
        placeholder='Search Country'
      />
      <datalist id='country'>
        {filtrDatalist &&
          filtrDatalist.map(list => {
            return <option key={list.name} value={list.name} />
          })}
      </datalist>
      {filtrPeople
        ? filtrPeople.map(item => {
            return (
              <SearchCart
                item={item}
                key={item._id}
                iconeMessage={iconeMessage}
              />
            )
          })
        : items &&
          items.map(item => {
            return (
              <SearchCart
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

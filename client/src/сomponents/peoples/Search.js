import { useState } from "react"
import { useDispatch } from "react-redux"
import { searchPeople } from "src/redux/peoples/peopleAcsions"
import "../../styles/peoples/search.css"
function Search({ items }) {
  const dispatch = useDispatch()
  const [filtrDatalist, setFiltrDatalist] = useState()
  const changeHandler = e => {
    const peoples = []
    const datalist = []

    const peo = e.target.value.trim().toLowerCase()
    items &&
      items.filter(item => {
        if (item.name.toLowerCase() === peo) {
          peoples.push(item)
        }
        if (item.name.toLowerCase() >= peo) {
          datalist.push(item)
        }
        return false
      })
    setFiltrDatalist(datalist)
    dispatch(searchPeople(peoples))
  }

  return (
    <div className='containerSearch'>
      <input
        list='country'
        type='text'
        onInput={changeHandler}
        placeholder='Search'
      />
      <datalist id='country'>
        {filtrDatalist &&
          filtrDatalist.map(list => {
            return <option key={list.name} value={list.name} />
          })}
      </datalist>
    </div>
  )
}
export default Search

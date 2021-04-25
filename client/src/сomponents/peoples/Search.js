import { useDispatch } from "react-redux"
import { searchPeople } from "src/redux/peoples/peopleAcsions"
import "../../styles/peoples/search.css"
function Search({ items }) {
  const dispatch = useDispatch()
  const changeHandler = e => {
    const inputResult = e.target.value.trim().toLowerCase()
    const peoples = items.filter(item => {
      if (item.name.toLowerCase() >= inputResult) {
        return item
      }
      return false
    })
    if (!inputResult) dispatch(searchPeople(items))
    else dispatch(searchPeople(peoples))
  }

  return (
    <div className='containerSearch'>
      <input type='text' onInput={changeHandler} placeholder='Search' />
    </div>
  )
}
export default Search

import React from "react"
import { useDispatch } from "react-redux"
import { getSearchPeople } from "src/redux/searchPeople/peopleAcsions"
function SearchCart() {
  const dispstch = useDispatch()
  dispstch(getSearchPeople())
  return (
    <div style={{ paddingTop: "60px" }}>
      <h1> Hello search</h1>
    </div>
  )
}
export default SearchCart

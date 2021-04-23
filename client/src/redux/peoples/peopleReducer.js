//@ts-check
import { GET_SEARCH_PEOPLE, SEARCH_PEOPLE } from "./type"
const initialState = {
  items: "",
  search: "",
}
export const peopleReducer = (state = initialState, actoin) => {
  switch (actoin.type) {
    case GET_SEARCH_PEOPLE:
      return { ...state, items: actoin.payload }
    case SEARCH_PEOPLE:
      return { ...state, search: actoin.payload }
    default:
      return state
  }
}

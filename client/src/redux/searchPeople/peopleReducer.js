//@ts-check
import { GET_SEARCH_PEOPLE } from "./type"
const initialState = {
  people: null,
}
export const peopleReducer = (state = initialState, actoin) => {
  switch (actoin.type) {
    case GET_SEARCH_PEOPLE:
      return { ...state, people: actoin.payload }
    default:
      return state
  }
}

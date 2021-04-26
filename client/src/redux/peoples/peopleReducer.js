//@ts-check
import {
  GET_SEARCH_PEOPLE,
  SEARCH_PEOPLE,
  SOCKET_MESSAGE_PEOPLE,
  GET_MESSAGES_PEOPLE,
} from "./type"
const initialState = {
  items: null,
  search: null,
  message: null,
}
export const peopleReducer = (state = initialState, actoin) => {
  switch (actoin.type) {
    case GET_SEARCH_PEOPLE:
      return { ...state, items: actoin.payload }
    case SEARCH_PEOPLE:
      return { ...state, search: actoin.payload }
    case GET_MESSAGES_PEOPLE:
      return { ...state, message: actoin.payload }
    case SOCKET_MESSAGE_PEOPLE:
      return { ...state, message: [...state.message, actoin.payload] }
    default:
      return state
  }
}

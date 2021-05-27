//@ts-check
import {
  GET_SEARCH_PEOPLE,
  SEARCH_PEOPLE,
  SOCKET_MESSAGE_PEOPLE,
  GET_MESSAGES_PEOPLE,
  SHOW_CHAT,
  INTER_LOCUTOR,
  UNREAD_MESSAGES_PEOPLE,
} from './type'
const initialState = {
  items: null,
  search: null,
  message: null,
  chat: false,
  interL: null,
  unread: null,
}
export const messageReducer = (state = initialState, actoin) => {
  switch (actoin.type) {
    case GET_SEARCH_PEOPLE:
      return { ...state, items: actoin.payload }
    case SEARCH_PEOPLE:
      return { ...state, search: actoin.payload }
    case GET_MESSAGES_PEOPLE:
      return { ...state, message: actoin.payload }
    case SOCKET_MESSAGE_PEOPLE:
      return { ...state, message: [...state.message, actoin.payload] }
    case SHOW_CHAT:
      return { ...state, chat: actoin.payload }
    case INTER_LOCUTOR:
      return { ...state, interL: actoin.payload }
    case UNREAD_MESSAGES_PEOPLE:
      return { ...state, unread: actoin.payload }
    default:
      return state
  }
}

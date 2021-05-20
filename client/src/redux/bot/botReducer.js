//@ts-check
import { GET_BOTS, SHOW_MODAL_BOT } from './type'
const initialState = {
  items: null,
  showBot: false,
}
export const botReducer = (state = initialState, actoin) => {
  switch (actoin.type) {
    case SHOW_MODAL_BOT:
      return { ...state, showBot: actoin.payload }
    case GET_BOTS:
      return { ...state, items: actoin.payload }
    default:
      return state
  }
}

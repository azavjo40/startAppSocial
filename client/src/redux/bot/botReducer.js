//@ts-check
import { GET_BOTS } from './type'
const initialState = {
  items: null,
}
export const botReducer = (state = initialState, actoin) => {
  switch (actoin.type) {
    case GET_BOTS:
      return { ...state, items: actoin.payload }
    default:
      return state
  }
}

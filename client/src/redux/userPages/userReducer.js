//@ts-check
import { SHOW_USER_CART, USER_PAGES_PAGE, USER_CART_DATA } from './types'
const initialState = {
  user: null,
  showCart: false,
  userCart: null,
}
export const userReducer = (state = initialState, actoin) => {
  switch (actoin.type) {
    case USER_PAGES_PAGE:
      return { ...state, user: actoin.payload }
    case SHOW_USER_CART:
      return { ...state, showCart: actoin.payload }
    case USER_CART_DATA:
      return { ...state, userCart: actoin.payload }
    default:
      return state
  }
}

//@ts-check
import { USER_PAGES_PAGE } from "./types";
const initialState = {
  user: null,
};
export const userReducer = (state = initialState, actoin) => {
  switch (actoin.type) {
    case USER_PAGES_PAGE:
      return { ...state, user: actoin.payload };
    default:
      return state;
  }
};

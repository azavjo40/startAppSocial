//@ts-check
import { SHOW_ALERT, IS_LOADING } from "./types";
const initialState = {
  isloading: false,
  alert: null,
};
export const generalReducer = (state = initialState, actoin) => {
  switch (actoin.type) {
    case IS_LOADING:
      return { ...state, isloading: actoin.payload };
    case SHOW_ALERT:
      return { ...state, alert: actoin.payload };
    default:
      return state;
  }
};

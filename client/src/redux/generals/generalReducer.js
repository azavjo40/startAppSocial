//@ts-check
import {
  SHOW_ALERT,
  HIDE_ALERT,
  IS_LOADING_FALSE,
  IS_LOADING_TRUE,
} from "./types";
const initialState = {
  isloading: false,
  alert: null,
};
export const generalReducer = (state = initialState, actoin) => {
  switch (actoin.type) {
    case IS_LOADING_FALSE:
      return { ...state, isloading: false };

    case IS_LOADING_TRUE:
      return { ...state, isloading: true };

    case SHOW_ALERT:
      return { ...state, alert: actoin.payload };

    case HIDE_ALERT:
      return { ...state, alert: null };
    default:
      return state;
  }
};

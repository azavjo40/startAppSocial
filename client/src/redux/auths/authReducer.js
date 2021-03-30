//@ts-check
import { IS_AUTH_USER } from "./types";

const initialState = {
  isAuthUser: false,
};

export const authReducer = (state = initialState, actoin) => {
  switch (actoin.type) {
    case IS_AUTH_USER:
      return { ...state, isAuthUser: actoin.payload };
    default:
      return state;
  }
};

//@ts-check
import { IS_AUTH_USER, AUTH_TOKEN, AUTH_STORAGE } from "./types";

const initialState = {
  isAuthUser: false,
  token: null,
  storage: "",
  authAdmin: null,
};

export const authReducer = (state = initialState, actoin) => {
  switch (actoin.type) {
    case IS_AUTH_USER:
      return { ...state, isAuthUser: actoin.payload };
    case AUTH_TOKEN:
      return { ...state, token: actoin.payload };
    case AUTH_STORAGE:
      return { ...state, storage: actoin.payload };
    default:
      return state;
  }
};

//@ts-check
import { combineReducers } from "redux";
import { authReducer } from "./auths/authReducer";
import { generalReducer } from "./generals/generalReducer";

export const roodReducer = combineReducers({
  // тут будить хранилешь
  auth: authReducer,
  general: generalReducer,
});

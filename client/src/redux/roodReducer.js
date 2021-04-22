//@ts-check
import { combineReducers } from "redux"
import {
  authReducer,
  generalReducer,
  userReducer,
  peopleReducer,
} from "./index"
export const roodReducer = combineReducers({
  // тут будить хранилешь
  auth: authReducer,
  general: generalReducer,
  userPages: userReducer,
  peoples: peopleReducer,
})

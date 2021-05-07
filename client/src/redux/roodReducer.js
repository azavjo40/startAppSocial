//@ts-check
import { combineReducers } from "redux"
import {
  authReducer,
  generalReducer,
  userReducer,
  peopleReducer,
} from "./index"
export const roodReducer = combineReducers({
  auth: authReducer,
  general: generalReducer,
  userPages: userReducer,
  peoples: peopleReducer,
})

//@ts-check
import { combineReducers } from 'redux'
import {
  authReducer,
  generalReducer,
  userReducer,
  messageReducer,
  botReducer,
} from './index'
export const roodReducer = combineReducers({
  auth: authReducer,
  general: generalReducer,
  userPages: userReducer,
  peoples: messageReducer,
  bot: botReducer,
})

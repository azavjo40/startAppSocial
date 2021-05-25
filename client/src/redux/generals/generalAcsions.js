//@ts-check
import { IS_LOADING, SHOW_ALERT } from './types'
import { LOCAL_STORAGE } from '../../constant/localstorage'
export const getStorage = async () => {
  return await JSON.parse(localStorage.getItem(LOCAL_STORAGE.STORAGE_NAME))
}

export const showLoader = (bool) => ({ type: IS_LOADING, payload: bool })

export function showAlert(text) {
  return (dispach) => {
    dispach({
      type: SHOW_ALERT,
      payload: text,
    })
    setTimeout(() => {
      dispach({
        type: SHOW_ALERT,
        payload: null,
      })
    }, 3000)
  }
}

//@ts-check
import { LOCAL_STORAGE } from '../../constant/localstorage'
import { autoSaveStorage } from '../auths/authAcsions'
import { httpFetch } from '../hooks/httpFetch'
import { USER_PAGES_PAGE } from './types'
let storage
const getStorage = async () => {
  storage = await JSON.parse(localStorage.getItem(LOCAL_STORAGE.STORAGE_NAME))
}

export const userPagesPage = (text) => {
  return async (dispach) => {
    if (text.userId) {
      await dispach({
        type: USER_PAGES_PAGE,
        payload: text,
      })
    }
  }
}

export const getUserPage = (isAuthUser) => {
  return async (dispatch) => {
    try {
      await getStorage()
      if (storage.userId && isAuthUser) {
        const userId = storage.userId
        const options = {
          url: `/api/auth/get/user/page/${userId}`,
          method: 'GET',
          body: null,
          file: null,
          token: storage.token,
          type: null,
        }
        const { data } = await dispatch(httpFetch(options))
        await dispatch(autoSaveStorage(data))
      }
    } catch (e) {
      console.log(e)
    }
  }
}

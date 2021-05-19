//@ts-check
import { LOCAL_STORAGE } from '../../constant/localstorage'
import { autoSaveStorage } from '../auths/authAcsions'
import { httpFetch } from '../hooks/httpFetch'
import { USER_PAGES_PAGE, SHOW_USER_CART, USER_CART_DATA } from './types'

const getStorage = async () => {
  return await JSON.parse(localStorage.getItem(LOCAL_STORAGE.STORAGE_NAME))
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
      const storage = await getStorage()
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

export const showUserCart = (bool, item) => {
  return (dispach) => {
    dispach({ type: SHOW_USER_CART, payload: bool })
    dispach({ type: USER_CART_DATA, payload: item })
  }
}

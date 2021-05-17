//@ts-check
import { LOCAL_STORAGE } from '../../constant/localstorage'
import { httpFetch } from '../hooks/httpFetch'
import { USER_PAGES_PAGE } from '../userPages/types'
import { userPagesPage } from '../userPages/userAcsions'
import { IS_AUTH_USER } from './types'

let storage
const getStorage = async () => {
  storage = await JSON.parse(localStorage.getItem(LOCAL_STORAGE.STORAGE_NAME))
}

export const authUser = (isAuthUser) => ({
  type: IS_AUTH_USER,
  payload: isAuthUser,
})

export const autoSaveStorage = (data) => {
  return async (dispach) => {
    if (data.token) {
      await localStorage.setItem(
        LOCAL_STORAGE.STORAGE_NAME,
        JSON.stringify({
          token: data.token,
          userId: data.userId,
          user: data._doc,
        })
      )
      await dispach(authUser(true))
      await dispach(userPagesPage(data))
    } else {
      dispach(logout())
    }
  }
}

export function autoLogin() {
  return async (dispach) => {
    try {
      await getStorage()
      if (storage.token) {
        await dispach(authUser(true))
      } else {
        await dispach(authUser(false))
      }
    } catch (e) {}
  }
}

export function authRegister(form) {
  return async (dispach) => {
    const formdata = new FormData()
    formdata.append('country', form.country)
    formdata.append('name', form.name)
    formdata.append('email', form.email)
    formdata.append('password', form.password)
    formdata.append('file', form.file)
    try {
      const options = await {
        url: '/api/auth/register',
        method: 'POST',
        body: null,
        file: formdata,
        token: null,
        type: null,
      }
      const { data } = await dispach(httpFetch(options))
      await dispach(autoSaveStorage(data))
    } catch (e) {
      console.log(e)
    }
  }
}

export function authLogin(form) {
  const options = {
    url: '/api/auth/login',
    method: 'POST',
    body: form,
    file: null,
    token: null,
    type: null,
  }
  return async (dispach) => {
    try {
      const { data } = await dispach(httpFetch(options))
      await dispach(autoSaveStorage(data))
    } catch (e) {
      console.log(e)
    }
  }
}

let setTime
export const refreshToken = (isAuthUser) => {
  return async (dispach) => {
    try {
      await getStorage()
      if (storage.userId && isAuthUser) {
        const options = {
          url: '/api/auth/refresh/token',
          method: 'POST',
          body: { userId: storage.userId },
          file: null,
          token: storage.token,
          type: null,
        }
        setTime = setInterval(async () => {
          const { data } = await dispach(httpFetch(options))
          await dispach(autoSaveStorage(data))
        }, 1000000)
      }
    } catch (e) {
      console.log(e)
    }
  }
}

export const userChangeAvatar = (form) => {
  return async (dispach) => {
    try {
      await getStorage()
      let formdata
      if (form.file) {
        formdata = new FormData()
        formdata.append('country', form.country)
        formdata.append('_id', form._id)
        formdata.append('name', form.name)
        formdata.append('email', form.email)
        formdata.append('imageSrcAvatar', form.imageSrcAvatar)
        formdata.append('file', form.file)
      }
      const options = {
        url: '/api/auth/user/change/avatar',
        method: 'PATCH',
        token: storage.token,
        type: null,
      }
      formdata ? (options.file = formdata) : (options.body = form)
      if (form) {
        const { data } = await dispach(httpFetch(options))
        await dispach(autoSaveStorage(data))
      }
    } catch (e) {
      console.log(e)
    }
  }
}

export function logout() {
  return async (dispach) => {
    await dispach(authUser(false))
    await localStorage.removeItem(LOCAL_STORAGE.STORAGE_NAME)
    await dispach({ type: USER_PAGES_PAGE, payload: null })
    await clearInterval(setTime)
  }
}

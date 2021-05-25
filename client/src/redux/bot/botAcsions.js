//@ts-check
import { httpFetch } from '../hooks/httpFetch'
import { GET_BOTS, SHOW_MODAL_BOT } from './type'
import { getStorage } from '../generals/generalAcsions'

export const getBot = (userId) => {
  return async (dispach) => {
    const storage = await getStorage()
    const options = {
      url: `/api/get/bot/${userId}`,
      method: 'GET',
      body: null,
      file: null,
      token: storage.token,
      type: GET_BOTS,
    }
    try {
      await dispach(httpFetch(options))
    } catch (e) {
      console.log(e)
    }
  }
}

export const createBot = (form) => {
  return async (dispach) => {
    const storage = await getStorage()
    const options = {
      url: '/api/create/bot',
      method: 'POST',
      body: form,
      file: null,
      token: storage.token,
      type: null,
    }
    try {
      await dispach(httpFetch(options))
      dispach(getBot(storage.userId))
    } catch (e) {
      console.log(e)
    }
  }
}

export const showModalBot = (bool) => {
  return { type: SHOW_MODAL_BOT, payload: bool }
}

export const removeBot = (id) => {
  return async (dispach) => {
    const storage = await getStorage()
    const options = {
      url: `/api/remove/bot/${id}`,
      method: 'DELETE',
      body: null,
      file: null,
      token: storage.token,
      type: null,
    }
    try {
      await dispach(httpFetch(options))
      dispach(getBot(storage.userId))
    } catch (e) {
      console.log(e)
    }
  }
}

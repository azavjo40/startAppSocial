//@ts-check
import { LOCAL_STORAGE } from 'src/constant/localstorage'
import { httpFetch } from '../hooks/httpFetch'
import { GET_BOTS } from './type'
const storage = JSON.parse(localStorage.getItem(LOCAL_STORAGE.STORAGE_NAME))

export const createBot = (form) => {
  const options = {
    url: '/api/create/bot',
    method: 'POST',
    body: form,
    file: null,
    token: storage.token,
    type: null,
  }

  return async (dispach) => {
    try {
      await dispach(httpFetch(options))
    } catch (e) {
      console.log(e)
    }
  }
}

export const getBot = (userId) => {
  const options = {
    url: `/api/get/bot/${userId}`,
    method: 'GET',
    body: null,
    file: null,
    token: storage.token,
    type: GET_BOTS,
  }
  return async (dispach) => {
    try {
      await dispach(httpFetch(options))
    } catch (e) {
      console.log(e)
    }
  }
}

//@ts-check
import { showAlert } from '../generals/generalAcsions'
import { httpFetch } from '../hooks/httpFetch'
import {
  GET_MESSAGES_PEOPLE,
  GET_SEARCH_PEOPLE,
  INTER_LOCUTOR,
  SEARCH_PEOPLE,
  SHOW_CHAT,
  SOCKET_MESSAGE_PEOPLE,
  // UNREAD_MESSAGES_PEOPLE,
} from './type'
import { getStorage } from '../generals/generalAcsions'

export const getSearchPeople = () => {
  return async (dispach) => {
    const storage = await getStorage()
    if (storage.token) {
      try {
        const options = {
          url: `/api/search/peoples`,
          method: 'GET',
          body: null,
          file: null,
          token: storage.token,
          type: GET_SEARCH_PEOPLE,
        }
        await dispach(httpFetch(options))
      } catch (e) {
        console.log(e)
      }
    }
  }
}

export const searchPeople = (item) => {
  return async (dispach) => {
    dispach({ type: SEARCH_PEOPLE, payload: item })
  }
}

export const showChat = (item) => {
  return async (dispach) => {
    dispach({ type: SHOW_CHAT, payload: item })
  }
}

export const interLocutor = (item) => {
  return async (dispach) => {
    dispach({ type: INTER_LOCUTOR, payload: item })
  }
}

export const getSoketMessage = (socket) => {
  return (dispach) => {
    socket.on('message', ({ chatResult }) => {
      dispach({
        type: SOCKET_MESSAGE_PEOPLE,
        payload: chatResult,
      })
    })
  }
}

export const sendSoketMessage = (form, socket) => {
  return (dispach) => {
    if (!form.message) {
      dispach(showAlert('Something went wrong, try again'))
    } else {
      socket.emit('message', { form })
    }
  }
}

export const getMessages = (chatId) => {
  return async (dispach) => {
    const storage = await getStorage()
    if (!chatId) {
      dispach({ type: GET_MESSAGES_PEOPLE, payload: [] })
    } else {
      const options = {
        url: `/api/get/messages/${chatId}`,
        method: 'get',
        body: null,
        file: null,
        token: storage.token,
        type: GET_MESSAGES_PEOPLE,
      }
      await dispach(httpFetch(options))
    }
  }
}

export const unreadMsgRead = (_id) => {
  return async (dispach) => {
    const storage = await getStorage()
    if (storage.userId) {
      const options = {
        url: `/api/chat/unread/msg/read/${_id}`,
        method: 'GET',
        body: { userId: storage.userId },
        file: null,
        token: storage.token,
        type: null,
      }
      await dispach(httpFetch(options))
    }
  }
}

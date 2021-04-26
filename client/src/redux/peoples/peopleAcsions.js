//@ts-check
import { showAlert } from "../generals/generalAcsions"
import { httpFetch } from "../hooks/httpFetch"
import {
  GET_MESSAGES_PEOPLE,
  GET_SEARCH_PEOPLE,
  SEARCH_PEOPLE,
  SOCKET_MESSAGE_PEOPLE,
} from "./type"

export const getSearchPeople = () => {
  return async dispach => {
    const options = {
      url: `/api/search/peoples`,
      method: "GET",
      body: null,
      file: null,
      token: null,
      type: GET_SEARCH_PEOPLE,
    }
    await dispach(httpFetch(options))
  }
}

export const searchPeople = item => {
  return async dispach => {
    dispach({ type: SEARCH_PEOPLE, payload: item })
  }
}

export const getSoketMessage = socket => {
  return dispach => {
    socket.on("message", ({ chatResult }) => {
      dispach({ type: SOCKET_MESSAGE_PEOPLE, payload: chatResult })
    })
  }
}

export const sendSoketMessage = (form, socket) => {
  return dispach => {
    if (!form.message) {
      dispach(showAlert("Something went wrong, try again"))
    } else {
      socket.emit("message", { form })
    }
  }
}

export const getMessages = chatId => {
  return async dispach => {
    if (!chatId) {
      dispach(showAlert("Something went wrong, try again"))
      dispach({ type: GET_MESSAGES_PEOPLE, payload: null })
    } else {
      const options = {
        url: `/api/get/messages/${chatId}`,
        method: "get",
        body: null,
        file: null,
        token: null,
        type: GET_MESSAGES_PEOPLE,
      }
      await dispach(httpFetch(options))
    }
  }
}

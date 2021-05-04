//@ts-check
import { LOCAL_STORAGE } from "src/constant/localstorage"
import { showAlert } from "../generals/generalAcsions"
import { httpFetch } from "../hooks/httpFetch"
import {
  GET_MESSAGES_PEOPLE,
  GET_SEARCH_PEOPLE,
  INTER_LOCUTOR,
  SEARCH_PEOPLE,
  SHOW_CHAT,
  SOCKET_MESSAGE_PEOPLE,
} from "./type"
const storage = JSON.parse(localStorage.getItem(LOCAL_STORAGE.STORAGE_NAME))
export const getSearchPeople = () => {
  return async dispach => {
    const options = {
      url: `/api/search/peoples`,
      method: "GET",
      body: null,
      file: null,
      token: storage.token,
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

export const showChat = item => {
  return async dispach => {
    dispach({ type: SHOW_CHAT, payload: item })
  }
}

export const interLocutor = item => {
  return async dispach => {
    dispach({ type: INTER_LOCUTOR, payload: item })
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
        token: storage.token,
        type: GET_MESSAGES_PEOPLE,
      }
      await dispach(httpFetch(options))
    }
  }
}

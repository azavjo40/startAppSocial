//@ts-check
import { httpFetch } from "../hooks/httpFetch"
import { GET_SEARCH_PEOPLE, SEARCH_PEOPLE } from "./type"

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

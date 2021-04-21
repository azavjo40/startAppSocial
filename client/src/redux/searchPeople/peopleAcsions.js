//@ts-check
import { httpFetch } from "../hooks/httpFetch"

export const getSearchPeople = () => {
  return async dispach => {
    const options = {
      url: `/api/search/peoples`,
      method: "GET",
      body: null,
      file: null,
      token: null,
      type: null,
    }
    const { data } = await dispach(httpFetch(options))
    console.log(data)
  }
}

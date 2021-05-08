//@ts-check
import { showAlert, showLoader } from "../generals/generalAcsions"
export function httpFetch(options) {
  return async dispach => {
    try {
      dispach(showLoader(true))
      const requestOptions = {
        method: options.method,
        headers: { Authorization: options.token },
      }
      if (
        (options.method === "POST" && options.body) ||
        (options.method === "PATCH" && options.body)
      ) {
        requestOptions.body = JSON.stringify(options.body)
        requestOptions.headers = {
          "Content-Type": "application/json",
          Authorization: options.token,
        }
      }

      if (
        (options.file && options.method === "POST") ||
        (options.file && options.method === "PATCH")
      ) {
        requestOptions.body = options.file
      }

      const response = await fetch(options.url, requestOptions)
      const data = await response.json()

      if (options.type && data) {
        dispach({ type: options.type, payload: data })
      }
      dispach(showAlert(data.message))
      dispach(showLoader(false))
      return { data }
    } catch (e) {
      console.log(e)
    }
  }
}

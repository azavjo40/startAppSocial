//@ts-check
import { IS_LOADING, SHOW_ALERT } from "./types";

export const showLoader = (bool) => ({ type: IS_LOADING, payload: bool });

export function showAlert(text) {
  return (dispach) => {
    dispach({
      type: SHOW_ALERT,
      payload: text,
    });
    setTimeout(() => {
      dispach({
        type: SHOW_ALERT,
        payload: null,
      });
    }, 3000);
  };
}

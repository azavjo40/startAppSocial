//@ts-check
import {
  HIDE_ALERT,
  IS_LOADING_FALSE,
  IS_LOADING_TRUE,
  SHOW_ALERT,
} from "./types";

export const showLoader = () => {
  return { type: IS_LOADING_TRUE };
};
export const hideLoader = () => {
  return { type: IS_LOADING_FALSE };
};
export const hideAlert = () => {
  return { type: HIDE_ALERT };
};

export function showAlert(text) {
  return (dispach) => {
    dispach({
      type: SHOW_ALERT,
      payload: text,
    });
    setTimeout(() => {
      dispach(hideAlert());
    }, 3000);
  };
}

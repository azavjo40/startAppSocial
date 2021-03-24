//@ts-check
import { LOCAL_STORAGE } from "../../constant/localstorage";
import { showAlert } from "../generals/generalAcsions";
import { httpFetch } from "../hooks/httpFetch";
import { IS_AUTH_USER, AUTH_TOKEN, AUTH_STORAGE } from "./types";

const storage = JSON.parse(localStorage.getItem(LOCAL_STORAGE.STORAGE_NAME));

export const authUser = (isAuthUser) => {
  return { type: IS_AUTH_USER, payload: isAuthUser };
};

export const authToken = (token) => {
  return { type: AUTH_TOKEN, payload: token };
};

export function autoLogin(data) {
  return async (dispach) => {
    try {
      if (data.token) {
        localStorage.setItem(
          LOCAL_STORAGE.STORAGE_NAME,
          JSON.stringify({ token: data.token, userId: data.userId })
        );
      }
      if (storage.token) {
        dispach(authUser(true));
        dispach(authToken(storage.token));
      }
    } catch (e) {
      dispach(showAlert("Error something went wrong to Login"));
    }
  };
}

export function authRegister(form) {
  const options = {
    url: "/api/auth/register",
    method: "POST",
    body: form,
    file: null,
    token: null,
    type: AUTH_STORAGE,
  };
  return async (dispach) => {
    try {
      await dispach(httpFetch(options));
      const storage = await JSON.parse(
        localStorage.getItem(LOCAL_STORAGE.STORAGE_NAME)
      );
      if (storage.token) {
        await dispach(authUser(true));
      } else {
        await dispach(authUser(false));
      }
    } catch (e) {}
  };
}

export function authLogin(form) {
  const options = {
    url: "/api/auth/login",
    method: "POST",
    body: form,
    file: null,
    token: null,
    type: AUTH_STORAGE,
  };
  return async (dispach) => {
    try {
      await dispach(httpFetch(options));
      const storage = await JSON.parse(
        localStorage.getItem(LOCAL_STORAGE.STORAGE_NAME)
      );
      if (storage.token) {
        await dispach(authUser(true));
      } else {
        await dispach(authUser(false));
      }
    } catch (e) {}
  };
}

let setTime;
export const refreshToken = () => {
  const options = {
    url: "/api/auth/refresh/token",
    method: "POST",
    body: storage,
    file: null,
    token: storage.token,
    type: AUTH_STORAGE,
  };
  return (dispach) => {
    try {
      setTime = setTimeout(() => {
        dispach(httpFetch(options));
      }, 100000);
    } catch (e) {}
  };
};

export const logout = () => {
  return (dispach) => {
    localStorage.removeItem(LOCAL_STORAGE.STORAGE_NAME);
    dispach(authUser(false));
    clearTimeout(setTime);
  };
};

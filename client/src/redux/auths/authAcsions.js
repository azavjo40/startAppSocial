//@ts-check
import { LOCAL_STORAGE } from "../../constant/localstorage";
import { showAlert } from "../generals/generalAcsions";
import { httpFetch } from "../hooks/httpFetch";
import { USER_PAGES_PAGE } from "../userPages/types";
import { IS_AUTH_USER, AUTH_TOKEN, AUTH_STORAGE, AUTH_USERID } from "./types";

const storage = JSON.parse(localStorage.getItem(LOCAL_STORAGE.STORAGE_NAME));

export const authUser = (isAuthUser) => {
  return { type: IS_AUTH_USER, payload: isAuthUser };
};

export const authToken = (token) => {
  return { type: AUTH_TOKEN, payload: token };
};

export const authUserId = (userId) => {
  return { type: AUTH_USERID, payload: userId };
};

export const autoSaveStorage = (data) => {
  return async (dispach) => {
    if (data.token) {
      await localStorage.setItem(
        LOCAL_STORAGE.STORAGE_NAME,
        JSON.stringify({
          token: data.token,
          userId: data.userId,
        })
      );
      await dispach(authToken(data.token));
      await dispach(authUserId(data.userId));
      dispach(authUser(true));
    }
  };
};

export function autoLogin() {
  return async (dispach) => {
    try {
      if (storage.token) {
        await dispach(authToken(storage.token));
        await dispach(authUserId(storage.userId));
        dispach(authUser(true));
      }
    } catch (e) {
      dispach(showAlert("Error something went wrong to Login"));
    }
  };
}

export function authRegister(form) {
  return async (dispach) => {
    const formdata = new FormData();
    formdata.append("country", form.country);
    formdata.append("name", form.name);
    formdata.append("email", form.email);
    formdata.append("password", form.password);
    formdata.append("file", form.file);
    try {
      const options = await {
        url: "/api/auth/register",
        method: "POST",
        body: null,
        file: formdata,
        token: null,
        type: AUTH_STORAGE,
      };
      const { data } = await dispach(httpFetch(options));
      await dispach(autoSaveStorage(data));
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
      const { data } = await dispach(httpFetch(options));
      await dispach(autoSaveStorage(data));
    } catch (e) {
      console.log(e);
    }
  };
}

let setTime;
export const refreshToken = () => {
  return (dispach) => {
    try {
      if (storage.token) {
        const options = {
          url: "/api/auth/refresh/token",
          method: "POST",
          body: { userId: storage.userId },
          file: null,
          token: storage.token,
          type: AUTH_STORAGE,
        };
        setTime = setTimeout(() => {
          dispach(httpFetch(options));
        }, 500000);
      }
    } catch (e) {}
  };
};

export const logout = () => {
  return async (dispach) => {
    await localStorage.removeItem(LOCAL_STORAGE.STORAGE_NAME);
    dispach({ type: AUTH_STORAGE, payload: null });
    dispach({ type: USER_PAGES_PAGE, payload: null });
    dispach(authUser(false));
    clearTimeout(setTime);
  };
};

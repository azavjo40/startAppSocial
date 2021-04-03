//@ts-check
import { LOCAL_STORAGE } from "../../constant/localstorage";
import { showAlert } from "../generals/generalAcsions";
import { httpFetch } from "../hooks/httpFetch";
import { USER_PAGES_PAGE } from "../userPages/types";
import { IS_AUTH_USER } from "./types";

const storage = JSON.parse(localStorage.getItem(LOCAL_STORAGE.STORAGE_NAME));

export const authUser = (isAuthUser) => ({
  type: IS_AUTH_USER,
  payload: isAuthUser,
});

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
      dispach(authUser(true));
    }
  };
};

export function autoLogin() {
  return async (dispach) => {
    try {
      if (storage.token) {
        await dispach(authUser(true));
      } else {
        await dispach(authUser(false));
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
    console.log(formdata);
    try {
      const options = await {
        url: "/api/auth/register",
        method: "POST",
        body: null,
        file: formdata,
        token: null,
        type: USER_PAGES_PAGE,
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
    type: USER_PAGES_PAGE,
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
      if (storage.userId) {
        const options = {
          url: "/api/auth/refresh/token",
          method: "POST",
          body: { userId: storage.userId },
          file: null,
          token: storage.token,
          type: null,
        };
        setTime = setInterval(async () => {
          const { data } = await dispach(httpFetch(options));
          await dispach(autoSaveStorage(data));
        }, 1000000);
      }
    } catch (e) {}
  };
};

export const userChangeAvatar = (form) => {
  return async (dispach) => {
    const formdata = new FormData();
    formdata.append("country", form.country);
    formdata.append("name", form.name);
    formdata.append("email", form.email);
    formdata.append("imageSrcAvatar", form.imageSrcAvatar);
    formdata.append("file", form.file);
    try {
      const options = await {
        url: "/api/auth/user/change/avatar",
        method: "PATCH",
        body: null,
        file: formdata,
        token: storage.token,
        type: USER_PAGES_PAGE,
      };
      const { data } = await dispach(httpFetch(options));
      await dispach(autoSaveStorage(data));
    } catch (e) {}
  };
};

export const userChangeBanner = async (banner) => {
  return async (dispach) => {
    try {
    } catch (e) {
      console.log(e);
    }
  };
};

export const logout = () => {
  return async (dispach) => {
    await dispach(authUser(false));
    await localStorage.removeItem(LOCAL_STORAGE.STORAGE_NAME);
    await dispach({ type: USER_PAGES_PAGE, payload: null });
    clearInterval(setTime);
  };
};

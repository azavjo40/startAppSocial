//@ts-check
import { LOCAL_STORAGE } from "../../constant/localstorage";
import { httpFetch } from "../hooks/httpFetch";
import { USER_PAGES_PAGE } from "./types";

const storage = JSON.parse(localStorage.getItem(LOCAL_STORAGE.STORAGE_NAME));

export const getUserPage = (userId) => {
  return async (dispatch) => {
    try {
      if (userId) {
        const options = {
          url: `/api/auth/get/user/page/${userId}`,
          method: "GET",
          body: null,
          file: null,
          token: storage.token,
          type: USER_PAGES_PAGE,
        };
        await dispatch(httpFetch(options));
      }
    } catch (e) {}
  };
};

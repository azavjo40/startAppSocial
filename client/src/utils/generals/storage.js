import { LOCAL_STORAGE } from '../../constant/localstorage'
export const getStorage = () => {
  return JSON.parse(localStorage.getItem(LOCAL_STORAGE.STORAGE_NAME))
}

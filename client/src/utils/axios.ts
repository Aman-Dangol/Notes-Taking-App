import type { useAppDispatch } from "@/utils/hooks/redux-hook/store-hooks";
import { setAccessToken } from "@/utils/redux/auth-slice";
import axios from "axios";

const api = axios.create({
  baseURL: "api",
});

/**
 * Sets up an Axios interceptor to handle responses.
 * If the response contains an "access-token" header, it dispatches an action to update the access token in the Redux store.
 * @param dispatcher - The Redux dispatcher function.
 */
export const setInterceptor = (
  dispatcher: ReturnType<typeof useAppDispatch>
) => {
  api.interceptors.response.use((res) => {
    if (res.headers["access-token"]) {
      dispatcher(setAccessToken(res.headers["access-token"]));
    }
    return res;
  });
};

export default api;

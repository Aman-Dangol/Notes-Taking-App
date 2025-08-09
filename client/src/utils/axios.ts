import type { useAppDisptach } from "@/utils/hooks/redux-hook/store-hooks";
import { setAccessToken } from "@/utils/redux/auth-slice";
import axios from "axios";

const api = axios.create({
  baseURL: "api",
});

export const setInterceptor = (
  dispatcher: ReturnType<typeof useAppDisptach>
) => {
  api.interceptors.response.use((res) => {
    if (res.headers["access-token"]) {
      console.log(res.headers["access-token"]);
      dispatcher(setAccessToken(res.headers["access-token"]));
    }
    return res;
  });
};

export default api;

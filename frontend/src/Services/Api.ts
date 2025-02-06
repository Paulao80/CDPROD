import axios from "axios";
import { getUser, logout } from "./Auth";

const Api = axios.create({
  baseURL: `${process.env.REACT_APP_API}`,
});

Api.interceptors.request.use(async (value) => {
  const user = getUser();

  if (user) {
    value.headers.set("authorization-token", user.AccessToken);
  }

  return value;
});

Api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      logout();
    }

    return Promise.reject(error);
  }
);

export default Api;

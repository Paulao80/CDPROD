import axios, { AxiosRequestConfig } from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Api = axios.create({
  baseURL: "http://192.168.2.17:3333",
});

Api.interceptors.request.use(async (config: AxiosRequestConfig) => {
  const storageToken = await AsyncStorage.getItem("@cdprod:token");

  if (config.headers) config.headers["authorization-token"] = storageToken;

  return config;
});

export default Api;

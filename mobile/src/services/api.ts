import axios from "axios";

const Api = axios.create({
  baseURL: "http://192.168.2.17:3333",
});

export default Api;

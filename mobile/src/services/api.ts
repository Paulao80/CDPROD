import axios from "axios";

const Api = axios.create({
  baseURL: "http://192.168.2.12:3333",
});

export default Api;

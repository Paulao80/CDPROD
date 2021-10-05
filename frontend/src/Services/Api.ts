import axios, { AxiosRequestConfig } from 'axios';
import {getToken} from './Auth';

const Api = axios.create({
    baseURL: `${process.env.REACT_APP_API}`
});

const onFulfilled = async (config:AxiosRequestConfig) => {
    const token = getToken();

    if(token) {
        config.headers['authorization-token'] = token;
    }

    return config;
}

Api.interceptors.request.use(onFulfilled);

export default Api;
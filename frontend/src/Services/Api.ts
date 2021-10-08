import axios, { AxiosRequestConfig } from 'axios';
import {getUser, logout} from './Auth';

const Api = axios.create({
    baseURL: `${process.env.REACT_APP_API}`
});

Api.interceptors.request.use(async (config:AxiosRequestConfig) => {
    const user = getUser();

    if(user) {
        config.headers['authorization-token'] = user.AccessToken;
    };

    return config;
});

Api.interceptors.response.use(response => response, error => {
    if(error.response.status === 401){
        logout();
    }

    return Promise.reject(error);
});

export default Api;
import axios, { AxiosRequestConfig } from 'axios';
import {getUser} from './Auth';

const Api = axios.create({
    baseURL: `${process.env.REACT_APP_API}`
});

const onFulfilled = async (config:AxiosRequestConfig) => {
    const user = getUser();

    if(user) {
        config.headers['authorization-token'] = user.AccessToken;
    }

    return config;
}

Api.interceptors.request.use(onFulfilled);

export default Api;
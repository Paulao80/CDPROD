import axios, { AxiosRequestConfig } from 'axios';
import { useHistory } from 'react-router';
import {getUser, logout} from './Auth';

const Api = axios.create({
    baseURL: `${process.env.REACT_APP_API}`
});

const Redirect = () => {
    const history = useHistory();
    history.push('/account/login');
}

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
        Redirect();
    }

    return Promise.reject(error);
});

export default Api;
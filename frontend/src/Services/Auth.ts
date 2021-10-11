import { AxiosResponse } from 'axios';
import {User} from '../Interfaces';
import Api from './Api';

export const USER_KEY = "@cdtr-user";
export const isAuthenticated = () => (getUser() !== null);

export const getUser = () => {
    const data = localStorage.getItem(USER_KEY);
    return data !== null ? JSON.parse(data) as User : null;
};

export const login = async (EmailOrUser: string, Password: string) => {
    return await Api.post('/user/login', {
        EmailOrUser,
        Password
    }).then((response) => {

        if(response.status === 200){
            const token = response.headers['authorization-token'];
            const user = {
                AccessToken: token,
                ...response.data
            } as User;
        
            localStorage.setItem(USER_KEY, JSON.stringify(user));
        }

        return response;
    }).catch((error) => {
        return error.response as AxiosResponse<any>;
    });
};

export const register = async (Name: string, User: string, Email: string, Password: string, image: File[]) => {
    const data = new FormData();

    data.append('Name', Name);
    data.append('User', User);
    data.append('Email', Email);
    data.append('Password', Password);

    image.forEach(image => {
        data.append('image', image);
    });

    return await Api.post('/user/register', data)
    .then(response => response)
    .catch(error => error.response as AxiosResponse<any>);
}

export const update = async (UserId: number, Name: string, User: string, Email: string, PasswordOld?: string, PasswordNew?: string, PasswordNewConfimation?: string, image?: File[]) => {
    const data = new FormData();

    data.append('UserId', UserId.toString());
    data.append('Name', Name);
    data.append('User', User);
    data.append('Email', Email);
    if(PasswordOld !== undefined) data.append('PasswordOld',PasswordOld);
    if(PasswordNew !== undefined) data.append('PasswordNew',PasswordNew);
    if(PasswordNewConfimation !== undefined) data.append('PasswordNewConfimation',PasswordNewConfimation);
    if(image !== undefined) image.forEach(image => {
        data.append('image', image);
    });

    return await Api.put('/user', data)
    .then(response => {
        if(response.status === 200){
            const user = {
                AccessToken: getUser()?.AccessToken,
                ...response.data
            } as User;
        
            localStorage.setItem(USER_KEY, JSON.stringify(user));
        }

       return response;
    })
    .catch(error => error.response as AxiosResponse<any>);
}

export const logout = () => {
    localStorage.removeItem(USER_KEY);
};
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
    })
        .then((response) => {
            const token = response.headers['authorization-token'];
            const user = {
                AccessToken: token,
                ...response.data
            } as User;

            localStorage.setItem(USER_KEY, JSON.stringify(user));
            
            return user;
        })
        .catch(() => {
            return false;
        });
};

export const logout = () => {
    localStorage.removeItem(USER_KEY);
};
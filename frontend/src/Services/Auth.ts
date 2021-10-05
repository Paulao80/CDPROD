import Api from "./Api";

export const TOKEN_KEY = "@cdtr-token";
export const isAuthenticated = () => (getToken() !== null);
export const getToken = () => localStorage.getItem(TOKEN_KEY);

export const login = (token:string) => {
    localStorage.setItem(TOKEN_KEY, token);
};

export const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
};

export const verifyToken = () => {

}
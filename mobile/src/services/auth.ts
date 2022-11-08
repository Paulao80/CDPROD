import Api from "./api";

export interface Login {
  EmailOrUser?: string;
  Password?: string;
}

interface User {
  UserId: number;
  Name: string;
  User: string;
  Email: string;
  FotoPath: string;
}

interface Response {
  token: string;
  user: User;
}

export const login = async (request: Login) => {
  try {
    const response = await Api.post<User>("/user/login", request);
    const token = response.headers["authorization-token"];

    return {
      token,
      user: response.data,
    } as Response;
  } catch (err: any) {
    return null;
  }
};

import React, { createContext, useContext, useEffect, useState } from "react";
import * as auth from "../services/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Api from "../services/api";
import { Login } from "../services/auth";
import jwt_decode, { JwtPayload } from "jwt-decode";

interface AuthContextData {
  signed: boolean;
  user: object | null;
  loading: boolean;
  signIn(login: Login): Promise<void>;
  signOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<object | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStorageData() {
      const storageUser = await AsyncStorage.getItem("@cdprod:user");
      const storageToken = await AsyncStorage.getItem("@cdprod:token");

      if (storageUser && storageToken) {
        if (isExpired(storageToken)) signOut();
        else {
          setUser(JSON.parse(storageUser));
          Api.defaults.headers["authorization-token"] = storageToken;
        }
      }

      setLoading(false);
    }

    loadStorageData();
  }, []);

  async function signIn(login: Login) {
    const response = await auth.login(login);

    if (response) {
      const { user, token } = response;

      setUser(user);

      await AsyncStorage.setItem("@cdprod:user", JSON.stringify(user));
      await AsyncStorage.setItem("@cdprod:token", token);
    }
  }

  function isExpired(token: string): boolean {
    if (!token) return true;

    const { exp } = jwt_decode<JwtPayload>(token);
    const ExpToken = Number(exp);
    const dataAtualEmSegundos = new Date().getTime() / 1000;

    if (dataAtualEmSegundos > ExpToken) return true;

    return false;
  }

  function signOut() {
    AsyncStorage.clear();
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{ signed: !!user, user, loading, signIn, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);

  return context;
}

export default AuthContext;

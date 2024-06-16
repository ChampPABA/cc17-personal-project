import { createContext, useEffect, useState } from "react";
import userApi from "../apis/user";
import {
  getAccessToken,
  removeAccessToken,
  setAccessToken,
} from "../utils/local-storage";

export const UserContext = createContext();

export default function UserContextProvider({ children }) {
  const [authUser, setAuthUser] = useState(null);
  const [isAuthUserLoading, setIsAuthUserLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (getAccessToken()) {
          const res = await userApi.getAuthUser();
          setAuthUser(res.data.user);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsAuthUserLoading(false);
      }
    };

    fetchUser();
  }, []);

  const login = async (credentials) => {
    const res = await userApi.login(credentials);
    setAccessToken(res.data.accessToken);
    const resGetAuthUser = await userApi.getAuthUser();
    console.log(resGetAuthUser.data);
    setAuthUser(resGetAuthUser.data.user);
  };

  const logout = () => {
    removeAccessToken();
    setAuthUser(null);
  };

  return (
    <UserContext.Provider
      value={{ login, logout, authUser, isAuthUserLoading }}
    >
      {children}
    </UserContext.Provider>
  );
}

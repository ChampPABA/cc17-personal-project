import { createContext, useState } from "react";
import userApi from "../apis/user";
import { setAccessToken } from "../utils/local-storage";

export const UserContext = createContext();

export default function UserContextProvider({ children }) {
  const [authUser, setAuthUser] = useState(null);

  const login = async (credentials) => {
    const res = await userApi.login(credentials);
    setAccessToken(res.data.accessToken);
    const resGetAuthUser = await userApi.getAuthUser(credentials);
    console.log(resGetAuthUser.data);
    setAuthUser(resGetAuthUser.data.user);
  };
  const logout = () => {};

  return (
    <UserContext.Provider value={{ login }}>{children}</UserContext.Provider>
  );
}

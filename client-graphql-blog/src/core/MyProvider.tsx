import React from 'react'
import { GlobalData } from './GlobalData';
import jwt_decode from "jwt-decode";

interface Props {
    children: JSX.Element | JSX.Element[]
};

export const MyProvider: React.FC<Props> = ({children}) => {

  let logged: any = sessionStorage.getItem("auth");
  const decoded: any = logged ? jwt_decode(logged) : "";

  //* isAuthenticated
    const [isAuthenticated, setIsAuthenticated] = React.useState(
      (decoded?.user?.email && sessionStorage.getItem("auth")) ?? false
    );

  const LoginUser = React.useCallback(function (auth: string) {
    sessionStorage.setItem("auth", auth);
    setIsAuthenticated(true);
  }, []);

  const LogoutUser = React.useCallback(function () {
    sessionStorage.removeItem("auth");
    setIsAuthenticated(false);
  }, []);

  return (
    <GlobalData.Provider value={{ isAuthenticated, LoginUser, LogoutUser }}>
      {children}
    </GlobalData.Provider>
  );
}

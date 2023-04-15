import React from 'react';
import { GlobalData } from './GlobalData';
import { User } from '../Graphql';
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

  //* currentUser
      const user: string | null = sessionStorage.getItem("user");
      const [currentUser, setCurrentUser] = React.useState<User | null>(
        user ? JSON.parse(user) : null
      );

    React.useEffect(() => {
      setCurrentUser(user ? JSON.parse(user) : null);
    }, [user]);

const imgDefault: string =
  "https://tse4.mm.bing.net/th?id=OIP.F24Hpc1CvAdlBi0W7qJMSAAAAA&pid=Api&P=0";


  return (
    <GlobalData.Provider
      value={{
        isAuthenticated,
        LoginUser,
        LogoutUser,
        currentUser,
        imgDefault,
      }}
    >
      {children}
    </GlobalData.Provider>
  );
}

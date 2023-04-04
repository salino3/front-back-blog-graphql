import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { MyState } from "../../core/interface";
import { GlobalData } from "../../core/GlobalData";

export const PrivateRoutes: React.FC = () => {

    const { isAuthenticated } = React.useContext<MyState>(GlobalData);


  if (!isAuthenticated) {
    return <Navigate to={"/"} />;
  };

  return <Outlet />;
};

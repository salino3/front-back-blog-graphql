import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { MyState } from '../../core/interface';
import { GlobalData } from '../../core/GlobalData';


export const PublicRoutes: React.FC = () => {

    const { isAuthenticated } = React.useContext<MyState>(GlobalData);

  if (isAuthenticated) {
    return <Navigate to={"/privates"} />;
  }


  return <Outlet />;
}

import React from 'react';
import { GlobalData, MyState } from '../../core';
import { HeaderLayout } from '../../layouts';
import { Head1 } from './Head1';
import { NavBar } from './NavBar';
import { Head3 } from './Head3';
import './stylesNavbar.scss';


export const Header: React.FC = () => {

      const { LogoutUser, currentUser } = React.useContext<MyState>(GlobalData);

     const handleLogout = () => {
       sessionStorage.removeItem("user");
       LogoutUser();
     };

  return (
    <HeaderLayout>
    <Head1 currentUser={currentUser} handleLogout={handleLogout} />
    <NavBar currentUser={currentUser} />
     <Head3 />
    </HeaderLayout>
  );
}

import React from 'react';
import { GlobalData } from '../core/GlobalData';
import { MyState } from '../core';

export const MyProfile: React.FC = () => {

    const { LogoutUser, currentUser } = React.useContext<MyState>(GlobalData);


 const handleClick = () => {
  sessionStorage.removeItem("user");
  LogoutUser();
 };

  return (
    <>
      <div>Private</div>
      <button onClick={() => handleClick()}>Logout</button>
      <img src={currentUser?.img} width={"200px"} className='rounded' alt="photo" />
    </>
  );
}

import React from 'react'
import { User } from '../Graphql/interfaces';
import { MyState } from '../core/interface';
import { GlobalData } from '../core/GlobalData';

export const Private: React.FC = () => {

    const { LogoutUser } = React.useContext<MyState>(GlobalData);

    let user: string | null = sessionStorage.getItem("user");
    const [currentUser, setCurrentUser] = React.useState<User | null>( user ? JSON.parse(user) : null)

 console.log("current", currentUser);

 const handleClick = () => {
  sessionStorage.removeItem("user");
  LogoutUser();
 }

  return (
    <>
      <div>Private</div>
      <button onClick={() => handleClick()}>Logout</button>
      <img src={currentUser?.img} width={"200px"} className='rounded' alt="photo" />
    </>
  );
}

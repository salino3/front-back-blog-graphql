import React from 'react';
import { User } from '../../Graphql/interfaces';
import { MyState } from '../../core/interface';
import { GlobalData } from '../../core/GlobalData';
import { Link } from 'react-router-dom';

export const Header: React.FC = () => {

      const { LogoutUser } = React.useContext<MyState>(GlobalData);

   const user: string | null = sessionStorage.getItem("user");
    const [currentUser, setCurrentUser] = React.useState<User | null>({})

    React.useEffect(() => {
   setCurrentUser(user ? JSON.parse(user) : null);
    }, [user])

     const handleLogout = () => {
       sessionStorage.removeItem("user");
       LogoutUser();
     };
    

  return (
    <>
      <div className="head1">
        <div className="head1_home">
          <div>
            <Link to={"/"}>
              <button className="homeB btn btn-primary btn-sm">Home</button>
            </Link>
          </div>
          <p>{(currentUser && `welcome ${currentUser.username}!`) || ""}</p>
        </div>
        <div>
          {(currentUser && (
            <button
              className="btn btn-danger btn-sm"
              onClick={() => handleLogout()}
            >
              Logout
            </button>
          )) || (
            <Link to={"/login"}>
              <button className="mt-2 btn btn-success btn-sm">Login</button>
            </Link>
          )}
        </div>
      </div>
      <nav>
        <ul>
          <li>
            <Link to={`${(currentUser && `privates`) || ""}/list`}>List</Link>
          </li>
          <li>
            <Link to={`${currentUser ? "/privates/updateuser" : "/register"}`}>
              {currentUser ? "Update Info" : "Register"}
            </Link>
          </li>
          {currentUser && (
            <li>
              <Link to={"/privates/delete"}>Delete Account</Link>
            </li>
          )}
        </ul>
      </nav>
      <div className="head3">
        <label htmlFor="searching">Search a user</label>
        <form>
          <input type="text" id="searching" placeholder=".." required />
          <button className=" btn btn-sm btn-outline-primary" type="submit">
            <b>Send</b>
          </button>
        </form>
      </div>
    </>
  );
}

import React from 'react';
import { Link } from 'react-router-dom';
import { User } from '../../Graphql';

interface Props {
  currentUser: User | null;
};

export const NavBar: React.FC<Props> = (currentUser) => {

  return (
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
            <Link to={"/privates/deleteuser"}>Delete Account</Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

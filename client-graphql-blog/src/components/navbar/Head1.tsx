import React from 'react';
import { Link } from 'react-router-dom';
import { User } from '../../Graphql/interfaces';

interface Props {
  currentUser: User | null;
  handleLogout: () => void;
};

export const Head1: React.FC<Props> = (props) => {
    const {currentUser, handleLogout} = props;


  return (
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
  );
}

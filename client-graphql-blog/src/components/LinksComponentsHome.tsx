import React from 'react';
import { Link } from 'react-router-dom';

interface Props {
    register: string; 
    login: string;
};


export const LinksComponentsHome: React.FC<Props> = (props) => {
 const {register, login} = props;

  return (
    <div className="text-center my-5">
      <Link className="mx-3 text-success" to={register}>
        Go to Register
      </Link>
      <Link className=" mx-3 text-success" to={login}>
        Go to Login
      </Link>
    </div>
  );
}

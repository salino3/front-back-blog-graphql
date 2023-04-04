import React from 'react';
import { Link } from 'react-router-dom';
import './componentsStyles.scss';
// import jwt from "jsonwebtoken-browser";





export const PageNotFound: React.FC = () => {
 

  return (
    <div className='PNF'>
        <Link to={'/'}>Go Home</Link>
        <h1>* Page Not Found *</h1>
        <h1>* Page Not Found *</h1>
        <h1>* Page Not Found *</h1>
    </div>
 );
}



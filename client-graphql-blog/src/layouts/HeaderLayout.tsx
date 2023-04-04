import React from 'react';
import "./layoutStyles.scss";

interface Props {
  children: React.ReactNode;
};

export const HeaderLayout: React.FC<Props> = ({children}) => {

  return (
    <header className='divHeader rounded'>
       {children}
    </header>
  )
}

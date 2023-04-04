import React from 'react';
import './layoutStyles.scss';

interface Props {
  children: React.ReactNode;
};

export const HomeLayout: React.FC<Props> = ({children}) => {
    
  return (
    <div className='homeLayout'>
      {children}
    </div>
  )
}


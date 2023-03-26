import React, { ReactNode } from 'react';
import './layoutStyles.scss';

interface Props {
  children: ReactNode;
};

export const HomeLayout: React.FC<Props> = ({children}) => {
    
  return (
    <div className='homeLayout'>
      {children}
    </div>
  )
}


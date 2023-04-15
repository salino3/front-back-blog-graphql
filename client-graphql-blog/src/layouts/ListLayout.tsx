import React from 'react';

interface Props {
    children: React.ReactNode;
};

export const ListLayout: React.FC<Props> = ({children}) => {

  return (
    <div className="divList">
      {children}
    </div>
  );
}

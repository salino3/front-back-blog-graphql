import React from 'react';

interface Props {
    children: React.ReactNode
}

export const FormLayout: React.FC<Props> = ({children}) => {

  return (
    <div className='divForm'>
     {children}
    </div>
  )
}

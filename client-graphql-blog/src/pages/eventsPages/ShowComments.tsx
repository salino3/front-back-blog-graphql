
import React from 'react';


export const ShowPosts = (props): Props => {



  function handleShow(index: number) {
    setShow((prevShowb) => {
      const newShowb = [...prevShowb];
      newShowb[index] = !newShowb[index];
      console.log(newShowb[index]);
      return newShowb;
    });
  }
  return {
    
  };
}

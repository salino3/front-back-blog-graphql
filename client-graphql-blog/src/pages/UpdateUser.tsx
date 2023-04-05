import React from 'react';
import { FormLayout } from '../layouts';
import { useMutation } from '@apollo/client';
import { UPDATE_USER } from '../Graphql';

export const UpdateUser: React.FC = () => {

 const [updateUser, {error}] = useMutation(UPDATE_USER);



  return (
    <FormLayout>
      <form >
        
      </form>
    </FormLayout>
  )
}

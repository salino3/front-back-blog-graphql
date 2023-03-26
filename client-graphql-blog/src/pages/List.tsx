import { useQuery } from '@apollo/client';
import React from 'react';
import { GET_ALL_INFO } from "../Graphql";
import { User } from '../Graphql/interfeces';

export const List: React.FC = () => {

  const { data, error, refetch } = useQuery(GET_ALL_INFO);


  console.log(data);

  return (
    <>
      <h1>List</h1>
      {!data ||
        !data.users ||(data.users.length === 0 ? (<h1>Not Users Found</h1>) : (
          data.users.map((user: User) => (
            <div key={user.id}>
              <p>{user.username}</p>
            </div>
          ))  
        ))}
    </>
  );
}

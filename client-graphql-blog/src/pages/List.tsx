import { useQuery } from '@apollo/client';
import React from 'react';
import { GET_ALL_INFO, UserApi} from "../Graphql";
import { ListLayout } from '../layouts';
import { GlobalData, MyState } from '../core';

export const List: React.FC = () => {

  const { currentUser, imgDefault } = React.useContext<MyState>(GlobalData);
  const { data, error, refetch } = useQuery(GET_ALL_INFO);


if(error){
  return (
    <h1>
      {error?.message}
    </h1>
  )
};

console.log("dada", currentUser);
return (
  <ListLayout>
    <h1 className="text-center">List</h1>
    <div>
      {!data ||
        !data.users ||
        (data.users.length === 0 ? (
          <h1>Not Users Found</h1>
        ) : (
          data.users
            .slice()
            .reverse()
            .map((user: UserApi) => (
              <div className="divList2" key={user?.id}>
                <div>
                  <p>
                    <span className="text-warning">Usename: </span>
                    {user?.username}
                  </p>
                  <p>
                    {" "}
                    <span className="text-warning">Email: </span>
                    {user?.email}
                  </p>
                  <p>
                    {" "}
                    <span className="text-warning">Nickname: </span>
                    {user?.nickname}
                  </p>
                </div>
                <div>
                  <img
                    className="imgList "
                    src={user?.img || imgDefault}
                    width={"100px"}
                    alt=""
                  />
                </div>
              </div>
            ))
        ))}
    </div>
  </ListLayout>
);
}

import React from "react";
import { useQuery } from "@apollo/client";
import { ALL_POSTS, Post } from "../Graphql";
import { FormPosting, LinksComponentsHome, PostsList } from "../components";
import { HomeLayout } from "../layouts";
import { login, register } from "../router";
import { GlobalData, MyState } from "../core";
import "./pagesStyles.scss";

export const Home: React.FC = () => {

  const { data, error, refetch, loading } = useQuery<Post>(ALL_POSTS);

    const {  currentUser, imgDefault } = React.useContext<MyState>(GlobalData);


  const [show, setShow] = React.useState<boolean[]>(
    new Array(data?.length).fill(false)
  );


  function handleShow(index: number) {
    setShow((prevShow) => {
      const newShow = [...prevShow];
      newShow[index] = !newShow[index];
      console.log(newShow[index]);
      return newShow;
    });
  };

  if (loading) {
    return <h1 className="text-center mt-5 text-warning">Loading</h1>;
  };

  if (error) {
    return <h1 className="text-center mt-5 text-danger">* {error?.message} *</h1>;
  };


  return (
    <HomeLayout>
      <h3 className="text-center">Welcome to graphql page</h3>
     {!currentUser && <LinksComponentsHome register={register} login={login} /> || <FormPosting />}
      <PostsList data={data} 
      imgDefault={imgDefault} 
      handleShow={handleShow } 
      show={show} />
    </HomeLayout>
  );
};

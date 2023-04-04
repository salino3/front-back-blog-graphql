import React from "react";
import { useQuery } from "@apollo/client";
import { ALL_POSTS, User, Post } from "../Graphql";
import { PostsList } from "../components";
import { Link } from "react-router-dom";
import { HomeLayout } from "../layouts";
import { login, register } from "../router";
import { GlobalData, MyState } from "../core";
import "./pagesStyles.scss";

export const Home: React.FC = () => {

  const { data, error, refetch, loading } = useQuery<Post>(ALL_POSTS);

    const {  currentUser } = React.useContext<MyState>(GlobalData);


  const imgDefault: string =
    "https://tse4.mm.bing.net/th?id=OIP.F24Hpc1CvAdlBi0W7qJMSAAAAA&pid=Api&P=0";

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
     {!currentUser && <div className="text-center my-5">
        <Link className="mx-3 text-success" to={register}>
          Go to Register
        </Link>
        <Link className=" mx-3 text-success" to={login}>
          Go to Login
        </Link>
      </div> || <br />}
      <PostsList data={data} imgDefault={imgDefault} handleShow={handleShow } show={show} />
    </HomeLayout>
  );
};

import { useQuery } from "@apollo/client";
import React from "react";
import { Link } from "react-router-dom";
import { ALL_POSTS, GET_ONE_USER } from "../Graphql";
import { Comment, Post } from "../Graphql/interfeces";
import { HomeLayout } from "../layouts";
import { login, register } from "../router";
import "./pagesStyles.scss";

export const Home: React.FC = () => {
  const { data, error, refetch, loading } = useQuery(ALL_POSTS);

  const [show, setShow] = React.useState<boolean[]>(
    new Array(data?.length).fill(false)
  );

  console.log(data && data.posts);

  function handleShow(index: number) {
    setShow((prevShowb) => {
      const newShowb = [...prevShowb];
      newShowb[index] = !newShowb[index];
      console.log(newShowb[index]);
      return newShowb;
    });
  }

  return (
    <HomeLayout>
      <h3 className="text-center">Welcome to graphql page</h3>
      <div className="text-center my-5">
        <Link className="mx-3 text-success" to={register}>
          Go to Register
        </Link>
        <Link className=" mx-3 text-success" to={login}>
          Go to Login
        </Link>
      </div>
      <div>
        {!data || !data.posts || data.posts.length === 0 ? (
          <h1>Posts not Found</h1>
        ) : (
          data.posts.map((post: Post, index: number) => (
            <div
              key={index}
              className="border   rounded m-1 border-warning p-1 divListHome"
            >
              <p className="border-bottom  border-danger p-1">
                <span className="border rounded border-info px-1">post</span>{" "}
                {post?.title}{" "}
                <small className="border px-1 rounded text-warning float-end">
                  author:{" "}
                  <span className="text-white">{post?.author?.nickname}</span>
                </small>
              </p>
              <div>{post.body}</div>
              <input
                type="text"
                className="input1 rounded"
                placeholder="text a comment.."
              />
              <button
                onClick={() => handleShow(index)}
                className="rounded btn1"
              >
                <b>show comments</b>
              </button>
              <div className="">
                {!post || !post.comments || post.comments.length === 0 ? (
                  <div className="text-info border rounded   px-1">
                    No comments yet
                  </div>
                ) : (
                  show[index] &&
                  post.comments.map((item: Comment, index: number) => (
                    <div className="pt-1" key={index}>
                      <div className="border border-secondary rounded p-1">
                        {item?.comment}{" "}
                        <small className="border px-1 rounded text-warning float-end">
                          user:{" "}
                          <span className="text-white">
                            {item?.user?.nickname}
                          </span>
                        </small>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </HomeLayout>
  );
};

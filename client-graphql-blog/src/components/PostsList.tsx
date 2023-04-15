import React from 'react'
import { Post } from "../Graphql";
import { CommentsList } from "./CommentsList";
import { InputListPosts } from './InputListPosts';
import { BodyPosts } from './BodyPosts';

interface Props {
  data: Post | undefined;
  imgDefault: string;
  handleShow(index: number): void;
  show: boolean[];
};


export const PostsList: React.FC<Props> = (props) => {
    const {data, imgDefault, handleShow, show} = props;
    
  return (
    <div>
      {!data || !data.posts || data.posts.length === 0 ? (
        <h1>Posts not Found</h1>
      ) : (
        data.posts
          .slice()
          .reverse()
          .map((post: Post, index: number) => (
            <div
              key={index}
              className="border  rounded m-1 border-warning p-1 divListHome">
              <p className="border-bottom  border-danger py-1 pImg">
                <span className="border rounded border-info px-1 ">Title</span>{" "}
                {post?.title}{" "}
                <small className="border px-1  rounded text-warning float-end smallPhoto">
                  author:{" "}
                  <span className="text-white ">{post?.author?.nickname}</span>
                  <img
                    className="mx-1 imgProfile"
                    onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                      e.currentTarget.onerror = null; // para evitar bucles infinitos en caso de que la imagen predeterminada tampoco se cargue correctamente
                      e.currentTarget.src = imgDefault;
                    }}
                    src={`${post?.author?.img}`}
                    alt="logo"
                  />
                </small>
              </p>
              <BodyPosts post={post} />
              <InputListPosts
                post={post}
                handleShow={handleShow}
                index={index}
              />
              <div>
                <CommentsList post={post} show={show} index={index} />
              </div>
            </div>
          ))
      )}
    </div>
  );
}


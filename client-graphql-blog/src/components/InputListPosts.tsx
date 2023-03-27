import { useMutation } from '@apollo/client';
import React from 'react';
import { CREATE_COMMENT } from '../Graphql';
import { Post } from '../Graphql/interfaces';

interface Props {
  handleShow: (index: number) => void;
  index: number;
  post: Post;
};

export const InputListPosts: React.FC<Props> = (props) => {
    const {handleShow, post, index} = props;

   const [addComment, { error }] =  useMutation(CREATE_COMMENT);

   const [textComment, setTextComment] = React.useState("");

const handleClick = (): void => {
  if(post.id && textComment){
console.log({
  id: post.id,
  textComment
  });
 };
};

console.log("InputListPosts post", post)


  return (
    <>
      <input
        type="text"
        className="input1 rounded"
        placeholder="text a comment.."
        onChange={(event) => setTextComment(event.target.value)}
        />
      <button onClick={() => handleClick()} className="btn  btn-outline-primary mx-2 btninput">
        <b>send</b>
      </button>
      <button
        disabled={post?.comments?.length === 0 ? true : false}
        onClick={() => handleShow(index)}
        className="rounded btn1"
      >
        <b>show comments</b>
      </button>
    </>
  );
}

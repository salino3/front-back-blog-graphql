import { useMutation } from "@apollo/client";
import React from "react";
import { CREATE_COMMENT, Post } from "../Graphql";

interface Props {
  handleShow: (index: number) => void;
  index: number;
  post: Post;
}

export const InputListPosts: React.FC<Props> = (props) => {
  const { handleShow, post, index } = props;

  const [addComment, { error }] = useMutation(CREATE_COMMENT);

  const [textComment, setTextComment] = React.useState("");

  const handleClick = (): void => {
    if (post.id && textComment) {
      const token = sessionStorage.getItem("auth");
      addComment({
        variables: { postId: post.id, comment: textComment },
        context: {
          headers: {
            auth: token ? `Bearer ${token}` : "",
          },
        },
      })
        .then((result) => {
          console.log(result);
        })
        .catch((error) => {
          console.log(error);
          alert("Something went wrong..");
        });
    }
    setTextComment("");
  };

  return (
    <>
      <input
        type="text"
        className="input1 rounded"
        placeholder="text a comment.."
        required
        value={textComment}
        onChange={(event) => setTextComment(event.target.value)}
      />
      <button
        onClick={() => handleClick()}
        type="submit"
        className="btn  btn-outline-primary mx-2 btninput"
      >
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
};

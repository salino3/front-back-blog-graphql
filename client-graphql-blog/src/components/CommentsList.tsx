import React from 'react';
import { Comment, Post } from '../Graphql/interfaces';

interface Props {
  post: Post;
  show: boolean[];
  index: number;
};

export const CommentsList: React.FC<Props> = React.memo((props) => {
 const {post, show, index} = props;

 console.log("CommentList")

  return (
    <>
      {!post || !post.comments || post.comments.length === 0 ? (
        <div className="text-info border rounded   px-1">No comments yet</div>
      ) : (
        show[index] &&
        post.comments.map((item: Comment, index: number) => (
          <div className="pt-1" key={index}>
            <div className="border border-secondary rounded p-1">
              {item?.comment}{" "}
              <small className="border px-1 rounded text-warning float-end">
                user: <span className="text-white">{item?.user?.nickname}</span>
              </small>
            </div>
          </div>
        ))
      )}
    </>
  );
});

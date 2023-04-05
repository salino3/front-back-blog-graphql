import React from 'react';
import { Post } from '../Graphql';

interface Props {
  post: Post;
};

export const BodyPosts: React.FC<Props> = ({post}) => {

    return (
    <div className="border-bottom  border-danger mb-2 ">
      <small className="border px-1  rounded text-warning">Body</small>
      &nbsp; <span className="text-white">{post?.body}</span>
    </div>
  );
}

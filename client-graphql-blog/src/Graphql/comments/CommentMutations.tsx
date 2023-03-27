import { gql } from "@apollo/client";

export const CREATE_COMMENT = gql`
  mutation addComment($postId: ID!, $comment: String!) {
    addComment(postId: $postId, comment: $comment) {
      id
      comment
      user {
        email
      }
      post {
        id
        title
        author {
          email
        }
      }
    }
  }`;

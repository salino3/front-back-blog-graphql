import { gql } from "@apollo/client";


export const GET_ALL_INFO = gql`
  query users {
    users {
      id
      username
      email
      nickname
      posts {
        id
        title
        body
        author {
          id 
          username
          email
          nickname
          posts {
            id
            title
            body
            author {
              id
              email
            }
            comments {
              id
              comment
              user {
                email
              }
              post {
                id
              }
            }
          }
          comments {
            id
            comment
            user {
              id
              email
            }
            post {
              title
            }
          }
        }
      }
    }
  }
`;


export const GET_ONE_USER = gql`
  query  user($id: ID!) {
    user(id: $id) {
      username
      nickname
      comments {
        id
        comment
        user {
          id
          username
          email
          nickname
        }
        post {
          id
          title
          body
          author {
            id
            username
            email
            nickname
          }
        }
      }
    }
  }`;


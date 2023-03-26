import { gql } from "@apollo/client";


export const ALL_POSTS = gql`
 query  posts {
  posts {
    id
    title
    body
    
       author {
      id 
      email 
      username
      nickname
        
    }
    comments {
      comment
      user { 
        id
        email 
        username
        nickname
        
      }
    }
  } 
 }`;

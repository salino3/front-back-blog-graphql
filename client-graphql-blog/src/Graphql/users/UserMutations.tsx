import { gql } from "@apollo/client";

export const CREATE_USER = gql`
  mutation register(
    $username: String!
    $email: String!
    $password: String!
    $nickname: String!
    $img: String
  ) {
    register(
      username: $username
      email: $email
      password: $password
      nickname: $nickname
      img: $img 

    )
  }
`;

export const LOGIN_USER = gql`
 mutation login (
    $email: String!,
    $password: String!
 ) { 
 login (
    email: $email,
    password: $password,
  )
 }`;
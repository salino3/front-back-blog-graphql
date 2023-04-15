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

 export const UPDATE_USER = gql`
   mutation updateUser(
     $username: String
     $email: String
     $nickname: String
     $password: String
     $img: String
   ) {
     updateUser(
       username: $username
       email: $email
       nickname: $nickname
       password: $password
       img: $img
     ) {
       _id
       username
       email
       nickname
       img
     }
   }
 `;


export const DELETE_USER = gql`
 mutation deleteUser(
  $id: ID!
  $email: String!
  $password: String!
 ) {
  deleteUser (
    id: $id
    email: $email
    password: $password
  )
 }`;



const {GraphQLSchema, GraphQLObjectType, GraphQLString} = require('graphql');
const { users, user, posts, post, comments, comment } = require("./queries");
const {
  register,
  login,
  updateUser,
  deleteUser,
  createPost,
  updatePost,
  deletePost,
  addComment,
  updateComment,
  deleteComment,
} = require("./mutations");



const QueryType = new GraphQLObjectType({
  name: "QueryType",
  description: "the root query type",
  fields: {
    users,
    user,
    posts,
    post,
    comments,
    comment,
  },
});


const MutationType = new GraphQLObjectType({
  name: "MutationType",
  description: "The root mutation type",
  fields: {
    register,
    login,
    updateUser,
    deleteUser,
    createPost,
    updatePost,
    deletePost,
    addComment,
    updateComment,
    deleteComment,
  },
});

module.exports = new GraphQLSchema({
  query: QueryType,
  mutation: MutationType,
});
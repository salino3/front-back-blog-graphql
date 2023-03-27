const { GraphQLID: GID, GraphQLString: GS, GraphQLObjectType, GraphQLList} = require('graphql');
const {User, Post, Comment} = require('../models');

const UserType = new GraphQLObjectType({
  name: "UserType",
  description: "The user types",
  fields: () => ({
    id: { type: GID },
    username: { type: GS },
    email: { type: GS },
    nickname: { type: GS },
    createdAt: { type: GS },
    updatedAt: { type: GS },
    img: { type: GS },
    //
    posts: {
      type: new GraphQLList(PostType),
      async resolve(parent, args) {
        const post = await Post.find({ authorId: parent.id });
        return post;
      },
    },
    comments: {
      type: new GraphQLList(CommentType),
      async resolve(parent, args) {
        const comments = await Comment.find({ userId: parent.id });
        return comments;
      },
    },
  }),
});


const PostType = new GraphQLObjectType({
  name: "PostType",
  description: "The post type",
  fields: () => ({
    id: { type: GID },
    title: { type: GS },
    body: { type: GS },
    createdAt: { type: GS },
    updatedAt: { type: GS },
    author: {
      type: UserType,
     async resolve(parent, args) {
        const post = await User.findById(parent.authorId);
        return post;
      },
    },
    comments: {
      type: new GraphQLList(CommentType),
     async resolve(parent, args) {
         const comments = await Comment.find({ postId: parent.id });
        return comments;
      }
    }
  }),
});

const CommentType = new GraphQLObjectType({
  name: "CommentType",
  description: "The comment type",
  fields: {
    id: { type: GID },
    comment: { type: GS },
    user: {
      type: UserType,
      async resolve(parent, args) {
        const user = await User.findById(parent.userId);
        return user;
      },
    },
    post: {
      type: PostType,
      async resolve(parent, args) {
        const post = await Post.findById(parent.postId);
        return post;
      },
    },
  },
});


module.exports = {
  UserType,
  PostType,
  CommentType
};
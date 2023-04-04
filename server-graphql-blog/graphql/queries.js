const {GraphQLString: GS, GraphQLList, GraphQLID: GID, GraphQLBoolean: GB} = require('graphql');
const { UserType, PostType, CommentType } = require('./typeDefs');
const {User, Post, Comment} = require('../models');




const users = {
  name: "Get users and all info",
  type: new GraphQLList(UserType),
  description: "Returns a list of users and all info",
  async resolve() {

    const users = await User.find();
    return users;
  },
};

const user = {
  name: "Get a user by id",
  type: UserType,
  description: "Return one user",
  args: {
    id: {type: GID}
  },
  async resolve(_, {id}) {

     const user = await User.findById(id);
     
     if(!user) throw new Error("User not found");
     return user;
  }
};


const posts = {
  name: "Get posts",
  type: new GraphQLList(PostType),
  description: "Get all posts",
   resolve: async () => {
     const posts = await Post.find()
     
     return posts
  }
};

const post = { 
 name: "Get a post by id",
 type: PostType,
 description: "Return a post",
 args: {
  id: {type: GID}
 },
 async resolve(_, args) {

  const post = await Post.findById(args.id);

  if(!post) throw new Error("Post not found");
  
  return post;
 }
};


const comments = {
  name: "Get comments",
  type: new GraphQLList(CommentType),
  description: "Get all comments",
  resolve: async () => {
    const comments = await Comment.find();
    return comments;
  },
}; 

const comment = {
  name: "Get a comment by id",
  type: CommentType,
  description: "Return a comment",
  args: {
    id: {type: GID},
  },
  async resolve(_, args) {
    const comment = await Comment.findById(args.id);
     return comment;
  }
}




module.exports = { users, user, posts, post, comments, comment };
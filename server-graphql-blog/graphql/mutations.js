const {
  GraphQLString: GS,
  GraphQLID: GID,
  GraphQLBoolean: GB
} = require("graphql");
const {User, Post, Comment} = require('../models');
const {createJWTToken} = require('../util/auth');
const { user } = require("./queries");
const {PostType, CommentType, UserType} = require('./typeDefs');



const register = {
  name: "Registering",
  type: GS,
  description: "Register a new User and return a token",
  args: {
    username: { type: GS },
    email: { type: GS },
    password: { type: GS },
    nickname: { type: GS },
    img: { type: GS },
  },
  async resolve(_, args) {
    // agrs , como req.body
    const { username, email, password, nickname, img } = args;
    const newUser = new User({ username, email, password, nickname, img });

    await newUser.save();

    const _id = newUser._id;
    const { password: password2, ...others } = args;
    const others2 = { ...others, _id };
    const token = createJWTToken(others2);

    return token;
  },
};

const login = {
  name: "Login",
  type: GS,
  description: "Login a user and return a token",
  args: {
    email: { type: GS },
    password: { type: GS },
  },
  async resolve(_, args) {
    const user = await User.findOne({ email: args.email }).select("+password");

    if (!user) throw new Error("User not found");
    if (args.password !== user.password) throw new Error("Invalid credentials");

       
    const token = createJWTToken({
      _id: user._id,
      username: user.username,
      email: user.email,
      nickname: user.nickname,
      img: user.img
    });
    return token;
  }, 
};


const updateUser = {
  name: "Updating User info",
  type: UserType,
  args: {
    username: { type: GS },
    email: { type: GS },
    nickname: { type: GS },
    password: { type: GS },
    img: { type: GS },
    // img: { type: GraphQLUpload },
  },
  
  description: "Update the user info",
  async resolve(_, args, { verifiedUser }) {
    if (!verifiedUser) throw new Error("Unauthorized!");

    const { username, email, password, nickname, img } = args;

    const user = await User.findOne({
      _id: verifiedUser._id,
    });

    if (!user) {
      throw new Error("User doesn't exist!");
    }

    const update = {
      email: email || user?.email,
      password: password || user?.password,
      nickname: nickname || user?.nickname,
      username: username || user?.username,
      img: img || user?.img,
    };

    const existingUser = await User.findOne({ email: email });
    if (existingUser && existingUser.id !== verifiedUser._id) {
      throw new Error("Email address is already in use");
    }

    const updatedUser = await User.findOneAndUpdate(
      { _id: verifiedUser._id },
      update
      // { new: true, runValidators: true }
    );

    return updatedUser;
  },
};


const deleteUser = {
  name: "Delete User",
  type: GS,
  description: "Deleting a user",
  args: {
    id: {type: GID },
    email: {type: GS},
    password: {type: GS}
  },
  async resolve(_, args, {verifiedUser}) {
   
    const {id, email, password} = args;

    if (!verifiedUser || id !== verifiedUser._id) throw new Error("Unauthorized!");

    const userExist = await User.findById(id).select("+password");
    if(!userExist) throw new Error("There is no user with this id");

    if (userExist.email !== email || userExist.password !== password) {
      throw new Error("No corrects Credentials");
    };

    await User.findByIdAndDelete(id);

    return `User ${id} deleted`;
    
  }
}

const createPost = {
  name: "Posting",
  type: PostType,
  description: "Create a new post",
  args: {
    title: { type: GS },
    body: { type: GS },
  },
  async resolve(_, args, {verifiedUser}) {

   if(!verifiedUser) throw new Error("Unauthorized!");
  
    const newPost = new Post({
      title: args.title,
      body: args.body,
      authorId: verifiedUser._id,
    });
 
     await newPost.save();

    return newPost;
  },
};

const updatePost = {
  name: "Modifying post",
  type: PostType,
  description: "Update a post",
  args: {
    id:{type: GID},
    title: {type: GS},
    body: {type: GS},
    },
    async resolve(_, {id, title, body}, {verifiedUser}) {

    if(!verifiedUser) throw new Error("Unauthorized!");

    const updatedPost = await Post.findByIdAndUpdate(
      {_id: id, authorId: verifiedUser._id},
      { title, body },
      {new: true, runValidators: true});

      return updatedPost;
    }
};

const deletePost = {
  name: "Deleting post",
  type: GS,
  description: "Delete a post",
  args: {
    postId: {type: GID},
  },
  async resolve(_, {postId}, {verifiedUser}) {
    
    if(!verifiedUser) throw new Error('Unauthorized!');

    const deletedPost = await Post.findOneAndDelete({
      _id: postId,
      authorId: verifiedUser._id,
    });

  if (!deletedPost) {
    const post = await Post.findById(postId);
    if (!post) throw new Error("Post not Found");
    throw new Error("You can't delete other people's posts");
  };

  return `Post ${postId} deleted!`
  }

}

const addComment = {
  name: "Creating comment",
  type: CommentType,
  description: "Add a comment to a post",
  args: {
    comment: { type: GS },
    postId: { type: GID },
  },
  async resolve(_, { comment, postId }, { verifiedUser }) {
    if (!verifiedUser) throw new Error("Unauthorized!");

    const newComment = new Comment({
      comment: comment,
      postId: postId,
      userId: verifiedUser._id,
    });
    await newComment.save();
    return newComment;
  },
};


const updateComment = {
  name: "Updating comment",
  type: CommentType,
  description: "Update a comment",
  args: {
    id: { type: GID },
    comment: { type: GS },
  },
  async resolve(_, { id, comment }, { verifiedUser }) {

    if (!verifiedUser) throw new Error("Unauthorized!");

    const updatedComment = await Comment.findOneAndUpdate(
      { _id: id, userId: verifiedUser._id },
      { comment },
      { new: true, runValidators: true }
    );

    if(!updatedComment) throw new Error('Comment not found');

    return updatedComment;
  },
};


const deleteComment = {
  name: " Deleting comment",
  type: GS,
  description: "Delete a comment",
  args: {
    id: {type: GID},
  },
  async resolve(_, args, {verifiedUser}) {

   if(!verifiedUser) throw new Error('Unauthorized!');

   const commentDeleted = await Comment.findOneAndDelete({
    _id: args.id,
    userId: verifiedUser._id
   });

   if(!deleteComment){
    const comment = await Comment.findById(args.id);
    if(!comment) throw new Error('Comment not Found');
    throw new Error("You can't delete other people's comments");
   };

   return `Comment ${args.id} deleted!`;

  }
};






module.exports = {
  register,
  login,
  updateUser,
  deleteUser,
  //
  createPost,
  updatePost,
  deletePost,
  //
  addComment,
  updateComment,
  deleteComment,
  };










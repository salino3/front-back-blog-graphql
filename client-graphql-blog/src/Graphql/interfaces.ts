export interface User {
    _id?: string | number;
    username?: string;
    email?: string;
    password?: string;
    nickname?: string;
    img?: string;

};

export interface Comment {
  id?: string | number;
  comment?: string;
  user?: User;
  post?: Post;
  createdAt?: string;
  updatedAt?: string;
};

export interface Post {
  posts: Post[];
  id?: string | number;
  title?: string;
  body?: string;
  createdAt?: string;
  updatedAt?: string;
  author?: User;
  comments?: Comment[];
  length?: number;
}





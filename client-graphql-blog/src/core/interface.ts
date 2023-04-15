import { User } from "../Graphql";


export interface MyState {
  isAuthenticated: string | boolean;
  LoginUser: (auth: string) => void;
  LogoutUser: () => void;
  currentUser: User | null;
  imgDefault: string;
}


export interface MyState {
  isAuthenticated: string | boolean;
  LoginUser: (auth: string) => void;
  LogoutUser: () => void;
}
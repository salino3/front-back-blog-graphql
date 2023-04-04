interface Routes {
    root: string;
    list: string;
    pnf: string;
    register: string;
    login: string;
    privates: string;
    myprofile: string;
}


const SwitchRouter: Routes = {
  root: "/",
  list: "/list",
  pnf: "/*",
  register: "/register",
  login: "/login",
  privates: "/privates",
  myprofile: "/privates/myprofile",
};

export const { root, list, pnf, register, login, privates, myprofile } = SwitchRouter;
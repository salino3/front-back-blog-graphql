interface Routes {
    root: string;
    list: string;
    pnf: string;
    register: string;
    login: string;
    privates: string;
}


const SwitchRouter: Routes = {
  root: "/",
  list: "/list",
  pnf: "/*",
  register: "/register",
  login: "/login",
  privates: "/privates",
};

export const {root, list, pnf, register, login, privates} = SwitchRouter;
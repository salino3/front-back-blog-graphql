interface Routes {
    root: string;
    list: string;
    pnf: string;
    register: string;
    login: string;
    privates: string;
    myprofile: string;
    updateuser: string;
    deleteuser: string;
}


const SwitchRouter: Routes = {
  root: "/",
  list: "/list",
  pnf: "/*",
  register: "/register",
  login: "/login",
  privates: "/privates",
  myprofile: "/privates/myprofile",
  updateuser: "/privates/updateuser",
  deleteuser: "/privates/deleteuser",
};

export const { root, list, pnf, register, login, privates, myprofile, updateuser, deleteuser } = SwitchRouter;
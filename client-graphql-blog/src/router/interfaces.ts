interface Routes {
    root: string;
    list: string;
    pnf: string;
    register: string;
    login: string;
}


const SwitchRouter: Routes = {

    root: '/',
    list: '/list',
    pnf: '/*',
    register: '/register',
    login: '/login'
};

export const {root, list, pnf, register, login} = SwitchRouter;
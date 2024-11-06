const appRoot = '/';

export const routes = {
    login: `/auth/login`,
    register: `/auth/register`,
    main: `${appRoot}`,
    users: 'users',
    userDetail: `/users/:uuid`,
};

export default routes;

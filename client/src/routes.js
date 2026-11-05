import React from 'react';

const Home = React.lazy(() => import('./screens/Home'));
const Login = React.lazy(() => import('./screens/Login'));



const routes = [
    { path: '/home', name: 'Home', component: Home },
    { path: '/login', name: 'Login', component: Login },
    { path: '/signup', name: 'SignUp', component: Login }

]

export default routes;
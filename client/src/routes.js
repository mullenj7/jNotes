import React from 'react';

const Home = React.lazy(() => import('./screens/Home'));
const SignIn = React.lazy(() => import('./screens/SignIn'));
const SignUp = React.lazy(() => import('./screens/SignUp'));



const routes = [
    { path: '/home', name: 'Home', component: Home },
    { path: '/login', name: 'Login', component: SignIn },
    { path: '/signup', name: 'SignUp', component: SignUp }

]

export default routes;
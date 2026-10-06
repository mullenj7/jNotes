import React from 'react';

const Home = React.lazy(() => import('./screens/Home'));



const routes = [
{path: '/home', name: 'Home', component: Home}

]

export default routes;
import React, { Suspense } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary'
import routes from './routes';

import AppComponent from './components/AppComponent';

function App() {
  return (
    <AppComponent signOut={() => { console.log("hi") }} user={{}}>
      <Suspense  >
        <Routes>
          {routes.map((route, id) => (route.component ? (
            <Route
              key={id}
              name={route.name}
              path={route.path}
              exact={route.exact}
              element={
                <ErrorBoundary
                  onError={() => { <Navigate replace to='/error' /> }} // doesn't have to navigate to display fallbackcomponent
                ><route.component />
                </ErrorBoundary>}
            />
          ) : (null)))}
          <Route path='/' element={<Navigate replace to='/home' />} />
        </Routes>
      </Suspense>
    </AppComponent>
  );
}

export default App;

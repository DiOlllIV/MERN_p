import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import AuthPage from './pages/AuthPage';
import CreatePage from './pages/CreatePage';
import DetailPage from './pages/DetailPage';
import LinksPage from './pages/LinksPage';

const useRoutes = (isAuthenticated) => {
  if(isAuthenticated) 
    return (
      <Switch>
        <Route exact path='/links'>
          <LinksPage />
        </Route>
        <Route exact path='/create'>
          <CreatePage />
        </Route>
        <Route path='/detail/:id'>
          <DetailPage />
        </Route>
        <Redirect to ="/create" />
      </Switch>
    );

  return (
    <Switch>
      <Route exact path="/">
        <AuthPage />
      </Route>
      <Redirect to ="/" />
    </Switch>
  );
};

export default useRoutes;
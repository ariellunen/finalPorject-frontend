import React, { useState, useCallback } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from 'react-router-dom';

import MainNavigation from './user/pages/MainNavigation';
import ColorPicker from './draw/pages/ColorPicker';
import Coloring from './draw/pages/Coloring';
import Form from './draw/pages/Form';
import AllDraw from './analysis/pages/AllDraw';
import Auth from './user/pages/Auth';
import { AuthContext } from './shared/context/auth-context';
import { useAuth } from './shared/hooks/auth-hook';
import Admin from './user/pages/Admin';
import AddUser from './user/pages/AddUser';
import ShapesPicker from './draw/pages/ShapesPicker';

const App = () => {
  const { token, login, logout, userId, emaill } = useAuth();
  console.log(emaill, userId);
  let routes;

  if (token) {
    if (userId === '6277c1484517cb29c0cd1d11') {
      routes = (
        <Switch>
          <Route path="/admin">
            <Admin />
          </Route>
          <Route path="/addUser">
            <AddUser />
          </Route>
          <Redirect to="/admin" />
        </Switch>
      )
    } else {
      routes = (
        <Switch>
          <Router>
            <Switch>
              <Route path="/" exact>
                <MainNavigation />
              </Route>
              <Route path="/drawing/color" exact>
                <ColorPicker />
              </Route>
              <Route path="/drawing/coloring" exact>
                <Coloring />
              </Route>
              <Route path="/analysis" exact>
                <AllDraw />
              </Route>
              <Route path="/form" exact>
                <Form />
              </Route>
              <Route path="/drawing/shapes" exact>
                <ShapesPicker />
              </Route>
              <Redirect to="/" />
            </Switch>
          </Router>
        </Switch>
      );
    }

  } else {
    routes = (
      <Switch>
        <Route path="/">
          <Auth />
        </Route>
        <Redirect to="/" />
      </Switch>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        userId: userId,
        login: login,
        logout: logout,
        emaill: emaill
      }}
    >
      <Router>
        {/* <MainNavigation /> */}
        <main>{routes}</main>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;

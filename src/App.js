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
import ShapesPicker from './draw/pages/ShapesPicker';

const App = () => {
  const { token, login, logout, userId } = useAuth();

  let routes;

  if (token) {
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
        <Route path="/drawing/shapes" exact>
          <ShapesPicker />
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
        <Redirect to="/" />
      </Switch>
    </Router>
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/auth">
          <Auth />
        </Route>
        <Redirect to="/auth" />
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
        logout: logout
      }}
    >
      <Router>
        {/* <MainNavigation /> */}
        <main>{routes}</main>
      </Router>
    </AuthContext.Provider>
  );

  
  // return (
  //   <Router>
  //     <Switch>
  //       <Route path="/" exact>
  //         <Auth />
  //       </Route>
  //       <Route path="/drawing/color" exact>
  //         <ColorPicker />
  //       </Route>
  //       <Route path="/drawing/coloring" exact>
  //         <Coloring />
  //       </Route>
  //       <Route path="/analysis" exact>
  //         <AllDraw />
  //       </Route>
  //       <Route path="/form" exact>
  //         <Form />
  //       </Route>
  //       <Redirect to="/" />
  //     </Switch>
  //   </Router>
  // );
};

export default App;

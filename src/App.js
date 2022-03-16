import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from 'react-router-dom';

import Users from './user/pages/Users';
import ColorPicker from './draw/pages/ColorPicker';
import Coloring from './draw/pages/Coloring';
import Analysis from './analysis/pages/analysis';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <Users />
        </Route>
        <Route path="/drawing/color" exact>
          <ColorPicker />
        </Route>
        <Route path="/drawing/coloring" exact>
          <Coloring />
        </Route>
        <Route path="/analysis" exact>
          <Analysis />
        </Route>
        <Redirect to="/" />
      </Switch>
    </Router>
  );
};

export default App;

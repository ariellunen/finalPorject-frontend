import React, { useState, useEffect } from 'react';
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
import AddUser from './user/components/AddUser';
import ShapesPicker from './draw/pages/ShapesPicker';
import DrawDetails from './analysis/pages/DrawDetails';
import Main from './user/pages/Main';
import AddKide from './user/components/AddKide';
import Definitions from './user/components/Definitions';
const App = () => {

  const { token, login, logout, userId, emaill, userTypee } = useAuth();
  let routes;
  const [permission, setPermission] = useState(true);
  const [user, setUser] = useState();
  const handlePermissionOn = () => {
    setPermission(true)
  }
  const handlePermissionOff = () => {
    setPermission(false)
  }

  useEffect(() => {
    console.log(userTypee);
  }, [permission])

  useEffect(() => {
    if (!userId) {
      return user && setUser(null) //logut
    }
    const getUser = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/users/${userId}`, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
        const responseData = await response.json();
        console.log(responseData, userId);
        setUser(responseData.user)
        console.log(responseData)
      } catch (err) {
        console.log(err);
      }
    }
    getUser()
  }, [userId])
  console.log('USER', user);

  if (token && user) {
    //ADMIN
    if (userId === '6277c1484517cb29c0cd1d11') {
      routes = (
        <Switch>
          <Route path="/admin">
            <Main />
          </Route>
          <Route path="/addKide">
            <AddKide />
          </Route>
          <Route path="/addUser">
            <AddUser />
          </Route>
          <Route path="/definitions">
            <Definitions handlePermissionOn={handlePermissionOn} handlePermissionOff={handlePermissionOff} />
          </Route>
          <Redirect to="/admin" />
        </Switch>
      )
    } else {
      console.log(user, user.userType === 'specialist', user.userType);
      console.log(user.userType === 'specialist' ? '/analysis' : '/form', permission);
      routes = (
        <Switch>
          <Router>
            <Switch>
              <Route path="/" exact>
                {permission ? <MainNavigation /> : <Redirect to={user.userType === 'specialist' ? '/analysis' : '/form'} />}
              </Route>
              <Route path="/drawing/color" exact>
                {permission ? <ColorPicker /> : <Redirect to={user.userType === 'specialist' ? '/' : '/drawing/color'} />}
                <ColorPicker />
              </Route>
              <Route path="/drawing/coloring" exact>
                {permission ? <Coloring /> : <Redirect to={user.userType === 'specialist' ? '/' : '/drawing/coloring'} />}
                <Coloring />
              </Route>
              <Route path="/analysis" exact>
                {permission ? <AllDraw /> : <Redirect to={user.userType === 'specialist' ? '/analysis' : '/'} />}
                <AllDraw />
              </Route>
              <Route path="/analysis/details" exact>
                {permission ? <DrawDetails /> : <Redirect to={user.userType === 'specialist' ? '/analysis/details' : '/'} />}

                <DrawDetails />
              </Route>
              <Route path="/form" exact>
                {permission ? <Form /> : <Redirect to={user.userType === 'specialist' ? '/' : '/form'} />}
                <Form />
              </Route>
              <Route path="/drawing/shapes" exact>
                {permission ? <ShapesPicker /> : <Redirect to={user.userType === 'specialist' ? '/' : '/drawing/shapes'} />}
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
        emaill: emaill,
        userTypee: userTypee
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

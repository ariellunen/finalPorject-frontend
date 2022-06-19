import React, { useState, useEffect, Suspense } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from 'react-router-dom';
import MainNavigation from './user/pages/MainNavigation';
import CircularProgress from '@mui/material/CircularProgress';
import Auth from './user/pages/Auth';
import { AuthContext } from './shared/context/auth-context';
import { useAuth } from './shared/hooks/auth-hook';
import Main from './user/pages/Main';
const AllDraw = React.lazy(() => import('./analysis/pages/AllDraw'))
const AddUser = React.lazy(() => import('./user/components/AddUser'))
const DrawDetails = React.lazy(() => import('./analysis/pages/DrawDetails'))
// const Main = React.lazy(() => import('./user/pages/Main'))
const Coloring = React.lazy(() => import('./draw/pages/Coloring'))
const ColorPicker = React.lazy(() => import('./draw/pages/ColorPicker'))
const Form = React.lazy(() => import('./draw/pages/Form'))
const ShapesPicker = React.lazy(() => import('./draw/pages/ShapesPicker'))
const Definitions = React.lazy(() => import('./user/components/Definitions'))
const AddKide = React.lazy(() => import('./user/components/AddKide'))
const App = () => {
  const { token, login, logout, userId, emaill, userTypee } = useAuth();
  let routes;
  const [permission, setPermission] = useState(true);
  const [user, setUser] = useState();
  const handlePermissionOn = () => {
    localStorage.setItem('permission', JSON.stringify(true));
    setPermission(true)
  }
  const handlePermissionOff = () => {
    localStorage.setItem('permission', JSON.stringify(false));
    setPermission(false)
  }

  useEffect(() => {
  }, [permission])

  useEffect(() => {
    if (!userId) {
      return user && setUser(null) //logut
    }
    const getUser = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BECKEND_URL}/users/${userId}`, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
        const responseData = await response.json();
        setUser(responseData.user)
      } catch (err) {
        console.log(err);
      }
    }
    getUser()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId])
  console.log('USER', user);

  if (token && user) {
    //ADMIN
    if (userId === '62ae40d65696f026d8f64877') {
      routes = (
        <Switch>
          <Route path="/admin">
            <Main />
          </Route>
          <Route path="/kids">
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
                {/* <ColorPicker /> */}
              </Route>
              <Route path="/drawing/coloring" exact>
                {permission ? <Coloring /> : <Redirect to={user.userType === 'specialist' ? '/' : '/drawing/coloring'} />}
                {/* <Coloring /> */}
              </Route>
              <Route path="/analysis" exact>
                {permission ? <AllDraw /> : <Redirect to={user.userType === 'specialist' ? '/analysis' : '/'} />}
                {/* <AllDraw /> */}
              </Route>
              <Route path="/analysis/details" exact>
                {permission ? <DrawDetails /> : <Redirect to={user.userType === 'specialist' ? '/analysis/details' : '/'} />}
                {/* <DrawDetails /> */}
              </Route>
              <Route path="/form" exact>
                {permission ? <Form /> : <Redirect to={user.userType === 'specialist' ? '/' : '/form'} />}
                {/* <Form /> */}
              </Route>
              <Route path="/drawing/shapes" exact>
                {permission ? <ShapesPicker /> : <Redirect to={user.userType === 'specialist' ? '/' : '/drawing/shapes'} />}
                {/* <ShapesPicker /> */}
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
        <main><Suspense fallback={<div className='center'><CircularProgress sx={{ position: 'fixed', top: '50%', left: '50%', height: '100px', width: '100px' }} /></div>}>{routes}</Suspense></main>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;

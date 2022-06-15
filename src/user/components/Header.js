import React, { useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import HelpIcon from '@mui/icons-material/Help';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import LogoutIcon from '@mui/icons-material/Logout';
import { AuthContext } from '../../shared/context/auth-context';
import SettingsIcon from '@mui/icons-material/Settings';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom'


let child = '';
function Header(props) {
  const { onDrawerToggle } = props;
  const auth = useContext(AuthContext);
  const [value, setValue] = React.useState(0);

  console.log("kide", props.kide)
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <React.Fragment>
      <AppBar color="primary" position="sticky" elevation={0}>
        <Toolbar>
          <Grid container spacing={1} alignItems="center" dir='ltr'>
            <Grid sx={{ display: { sm: 'none', xs: 'block' } }} item>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={onDrawerToggle}
                edge="start"
              >
                <MenuIcon />
              </IconButton>
            </Grid>
            {/* <Grid item xs /> */}
            <Grid item>
              <IconButton color="inherit" sx={{ p: 0.5 }}>
                <LogoutIcon onClick={auth.logout} />
              </IconButton>
            </Grid>
            <Grid item>
              <Tooltip title="definitions">
                <IconButton color="inherit" component={Link} to='/definitions'>
                  <SettingsIcon />
                </IconButton>
              </Tooltip>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <AppBar
        component="div"
        color="primary"
        position="static"
        elevation={0}
        sx={{ zIndex: 0 }}
      >
      </AppBar>

      <AppBar component="div" position="static" elevation={0} sx={{ zIndex: 0 }}>
        {/* {<Tabs value={1} onChange={handleChange} textColor="white" indicatorColor="white">
          <Tab
            label='אנשי מקצוע \ מדריכים'
            onClick={props.notKide}
            component={Link}
            to={'/admin'}
          />
          <Tab
            label='ילדים'
            onClick={props.isKide}
            component={Link}
            to={'/admin'}
          />
        </Tabs>} */}
        {/* {        <Tabs value={value} onChange={handleChange} textColor="white" indicatorColor="white">
          <Tab
            label='אנשי מקצוע \ מדריכים'
            onClick={props.notKide}
            component={Link}
            to={'/admin'}
          />
          <Tab
            label='ילדים'
            onClick={props.isKide}
            component={Link}
            to={'/admin'}
          />
        </Tabs>} */}
        <Button component={Link} to={'/admin'} type='button' color="secondary">אנשי מקצוע \ מדריכים</Button>
        <Button component={Link} to={'/kids'} type='button' color="secondary">ילדים</Button>

      </AppBar>
    </React.Fragment >
  );
}

Header.propTypes = {
  onDrawerToggle: PropTypes.func.isRequired,
};

export default Header;
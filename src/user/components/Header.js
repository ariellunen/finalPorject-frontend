import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import LogoutIcon from '@mui/icons-material/Logout';
import { AuthContext } from '../../shared/context/auth-context';
import SettingsIcon from '@mui/icons-material/Settings';
import { Link } from 'react-router-dom';

function Header(props) {
  const { onDrawerToggle } = props;
  const auth = useContext(AuthContext);

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
    </React.Fragment >
  );
}

Header.propTypes = {
  onDrawerToggle: PropTypes.func.isRequired,
};

export default Header;
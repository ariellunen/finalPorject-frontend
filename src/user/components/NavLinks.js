import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../../shared/context/auth-context';
import './NavLinks.css';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';


const NavLinks = (props) => {
  const auth = useContext(AuthContext);
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
         
          <IconButton color="inherit" sx={{ p: 0.5 }} >
            <LogoutIcon onClick={auth.logout} />
          </IconButton>
           <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            ציורים בסנכרון
          </Typography>
          <Button sx={{backgroundImage: 'url(https://i.postimg.cc/j2cmDRGQ/Breadcrumbs-8.png)', height: '40px', width:'40px', backgroundSize: '43px', backgroundRepeat: 'no-repeat'}}></Button>

        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default NavLinks;

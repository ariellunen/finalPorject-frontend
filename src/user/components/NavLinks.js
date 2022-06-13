import React, { useContext } from 'react';
import { AuthContext } from '../../shared/context/auth-context';
import './NavLinks.css';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { useHistory } from 'react-router-dom'
import LogoutIcon from '@mui/icons-material/Logout';
import { Link } from 'react-router-dom';


const NavLinks = (props) => {
  const auth = useContext(AuthContext);
  const history = useHistory()
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{height:47, bgcolor: '#4454a3'}}>
        <Toolbar>
        <Button component={Link} to={'/'} sx={{ backgroundImage: 'url(https://i.postimg.cc/j2cmDRGQ/Breadcrumbs-8.png)', marginTop: '-12px', height: '45px', width: '45px', backgroundSize: '40px', backgroundRepeat: 'no-repeat' }}></Button>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, marginRight:'15px' }}>
            ציורים בסנכרון
          </Typography>
          <IconButton color="inherit" sx={{ p: 0.5 }} >
            <LogoutIcon onClick={() => {
              auth.logout();
              history.push('/')
              
            }} />
          </IconButton>

        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default NavLinks;

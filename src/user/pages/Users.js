import React from 'react';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const Users = (props) => {
  const location = useLocation();
  console.log(location)
  
  return (
    <React.Fragment>
      <Button component={Link} to="/drawing/color" variant="contained" color="primary">
        Drawing
      </Button>
      <Button component={Link} to="/drawing/color" variant="contained" color="primary">
        Analysis
      </Button>
    </React.Fragment>
  )
};

export default Users;

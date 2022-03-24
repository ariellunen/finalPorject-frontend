import React from 'react';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import './User.css';
require('firebase/database');
require('firebase/auth');
require('firebase/storage');

const Users = (props) => {
  return (
    <React.Fragment>
      <div id='choice'>
        <Button component={Link} to="/form" variant="contained" color="primary" class='buttom'>
          מדריכים
        </Button>
        <Button component={Link} to="/analysis" variant="contained" color="primary" class='buttom'>
          אנשי מקצוע
        </Button>
      </div>
    </React.Fragment>
  )
};

export default Users;

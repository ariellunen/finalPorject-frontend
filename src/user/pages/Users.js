import React from 'react';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import './User.css';

const Users = (props) => {
  const location = useLocation();
  console.log(location)

  return (
    <React.Fragment>
      <div id='choice'>
        <Button component={Link} to="/drawing/color" variant="contained" color="primary" class='buttom'>
          {/* Drawing */}
          מדריכים
        </Button>
        <Button component={Link} to="/drawing/color" variant="contained" color="primary" class='buttom'>
          {/* Analysis */}
          אנשי מקצוע
        </Button>
      </div>
    </React.Fragment>
  )
};

export default Users;

import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { useHistory, useLocation } from "react-router-dom";

const TabsAdmin = () => {
    const location = useLocation();
    const isAdminPage = location.pathname === '/admin' || location.pathname === '/addUser'
    const [userScreen, setUsersScreen] = useState(isAdminPage? ('contained'):('outlined'))
    const [childrenScreen, setChildrenScreen] = useState(!isAdminPage? ('contained'):('outlined'))
    let history = useHistory();
    const handleClick = (e) => {
        if (e.target.id === 'user') {
            setChildrenScreen('outlined')
            setUsersScreen('contained')
            history.push('/admin')
        } else {
            setChildrenScreen('contained')
            setUsersScreen('outlined')
            history.push('/kids')
        }
    }
    return (
        <Stack sx={{ marginRight: '130px' }} direction="row">
            <Button id='user' type='button' onClick={handleClick} sx={{ borderTopLeftRadius: '15px', marginLeft: '10px', borderTopRightRadius: '15px', borderBottomLeftRadius: '0px', borderBottomRightRadius: '0px' }} variant={userScreen}>מדריכים \ אנשי מקצוע</Button>
            <Button id='children' type='button' onClick={handleClick} sx={{ borderTopLeftRadius: '15px', borderTopRightRadius: '15px', borderBottomLeftRadius: '0px', borderBottomRightRadius: '0px', marginLeft: '10px', }} variant={childrenScreen}>ילדים</Button>
        </Stack>
    )
}

export default TabsAdmin;

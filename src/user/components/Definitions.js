import React from 'react';
import {  ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Header from './Header';
import ContentDefin from './ContentDefin';

const Definitions = (props) => {
    return (
        <ThemeProvider>
            <Box sx={{ display: 'flex', minHeight: '100vh' }}>
                <CssBaseline />                
                <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <Header />
                    <Box component="main" sx={{ flex: 1, py: 6, px: 4, bgcolor: '#eaeff1' }}>
                        <ContentDefin handlePermissionOn={props.handlePermissionOn} handlePermissionOff={props.handlePermissionOff} />
                    </Box>
                    <Box component="footer" sx={{ p: 2, bgcolor: '#eaeff1' }}>
                        {/* <Copyright /> */}
                    </Box>
                </Box>

            </Box>
        </ThemeProvider>

    );
};

export default Definitions;

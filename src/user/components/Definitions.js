import React, { useState, useContext } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Content from './Content';
import Header from './Header';
import ContentDefin from './ContentDefin';

function Copyright() {
    return (
        <Typography variant="body2" color="text.secondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}.
        </Typography>
    );
}
// handlePermissionOn handlePermissionOff
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

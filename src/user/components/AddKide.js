import React, { useState, useEffect } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Header from './Header';
import ContentAddKide from './ContentAddKide';
import TabsAdmin from './TabsAdmin';
const AddKide = () => {
    return (
        <React.Fragment>
            <Box sx={{ display: 'flex', minHeight: '100vh' }}>
                <CssBaseline />
                <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <Header />
                    <Box component="main" sx={{ flex: 1, py: 6, px: 4, bgcolor: '#eaeff1' }}>
                        <TabsAdmin />
                        <ContentAddKide />
                    </Box>
                </Box>
            </Box>
        </React.Fragment>
    );
};

export default AddKide;

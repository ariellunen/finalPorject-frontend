import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import App from './App';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
    typography: {
        fontFamily: [
            'Ubuntu',
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
    },
});

ReactDOM.render(
    <ThemeProvider theme={theme}>
        <App id='app' />
    </ThemeProvider>, document.getElementById('root'));

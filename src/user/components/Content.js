import React, { useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import { Link } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Avatar from '@mui/material/Avatar';
import { useLocation } from "react-router-dom";
import TabsAdmin from './TabsAdmin';
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
let children = [];
let users = [];

export default function Content(props) {
    const [isReady, setIsReady] = useState(false);
    const location = useLocation();
    const isAdminPage = location.pathname === '/admin'
    useEffect(() => {
        const getData = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_BECKEND_URL}/users/children/`, {
                });
                const responseData = await response.json();
                children.push(responseData);
            } catch (err) {
                console.log(err);
            }

            try {
                const response = await fetch(`${process.env.REACT_APP_BECKEND_URL}/users/`, {
                });
                const responseData = await response.json();
                users.push(responseData);
                setIsReady(true);

            } catch (err) {
                console.log(err);
            }
        }
        getData();
    }, [isReady, props]);


    return (
        <ThemeProvider theme={theme}>
            <TabsAdmin />
            {isReady && <Paper sx={{ maxWidth: 936, margin: 'auto', overflow: 'hidden' }} dir='rtl'>
                <AppBar
                    position="static"
                    color="default"
                    elevation={0}
                    sx={{ borderBottom: '1px solid rgba(0, 0, 0, 0.12)' }}
                >
                    <Toolbar>
                        <Grid container spacing={2} alignItems="center">
                            <Grid item>
                                <SearchIcon color="inherit" sx={{ display: 'block' }} />
                            </Grid>
                            <Grid item xs>
                                <TextField
                                    fullWidth
                                    placeholder="Search by email address, phone number, or user UID"
                                    InputProps={{
                                        disableUnderline: true,
                                        sx: { fontSize: 'default' },
                                    }}
                                    variant="standard"
                                />
                            </Grid>
                            {!isAdminPage && <Grid item>
                                <Button variant="contained" sx={{ mr: 1 }} component={Link} to='/addKide'>
                                    הוספת משתמש
                                </Button>
                            </Grid>}
                            {isAdminPage && <Grid item>
                                <Button variant="contained" sx={{ mr: 1 }} component={Link} to='/addUser'>
                                    הוספת משתמש
                                </Button>
                            </Grid>}
                        </Grid>
                    </Toolbar>
                </AppBar>
                <Typography sx={{ my: 5, mx: 2 }} color="text.secondary" align="center">
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableBody>
                                {isAdminPage && users[0]?.users?.map((user) => (
                                    <TableRow
                                        key={user.name}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row" align="center">
                                            {user.name}
                                        </TableCell>
                                        <TableCell align="center">{user.email}</TableCell>
                                    </TableRow>
                                ))}
                                {!isAdminPage && children[0]?.children?.map((child) => (
                                    <TableRow
                                        key={child.name}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row" align="center">
                                            {child.name}
                                        </TableCell>
                                        <TableCell align="center">
                                            <Avatar alt="Remy Sharp" src={`${child.image}`} />
                                        </TableCell>

                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Typography>
            </Paper>}
        </ThemeProvider>
    );
}

import React, { useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import RefreshIcon from '@mui/icons-material/Refresh';
import { Link } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Avatar from '@mui/material/Avatar';
import { useHistory } from "react-router-dom";
let children = [];
let users = [];
export default function Content(props) {
    const [isReady, setIsReady] = useState(false);
    const [userss, setUsers] = useState([])
    let history = useHistory();
    const someEventHandler = event => {
        console.log(props.kide)
        let kide = props.kide
        history.push({
            pathname: '/addKide',
            state: kide
        });
    };
    useEffect(() => {
        const getData = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/users/children/`, {
                });
                const responseData = await response.json();
                children.push(responseData);
                console.log("children", responseData)

            } catch (err) {
                console.log(err);
            }

            try {
                const response = await fetch(`http://localhost:3000/api/users/`, {
                });
                const responseData = await response.json();
                users.push(responseData);
                setUsers(responseData)
                console.log(users)
                console.log(users[0].users)
                console.log(userss)
                setIsReady(true);


            } catch (err) {
                console.log(err);
            }
        }
        getData();
    }, [isReady]);

    let b


    useEffect(() => {
        b = (JSON.parse(localStorage.getItem('kide')))
        console.log(b)
        console.log("bbbbb", b)
    }, [JSON.parse(localStorage.getItem('kide'))])

    const [items, setItems] = useState([]);

    useEffect(() => {
        const kide = JSON.parse(localStorage.getItem('kide'));
        console.log("bbbbb", kide)

        if (items) {
            setItems(items);
        }
    }, []);

    return (
        <React.Fragment>
            {isReady && <Paper sx={{ maxWidth: 936, margin: 'auto', overflow: 'hidden' }}>
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
                            {b && <Grid item>
                                <Button variant="contained" sx={{ mr: 1 }} onClick={someEventHandler} >
                                    הוספת משתמש
                                </Button>
                                <Tooltip title="Reload">
                                    <IconButton>
                                        <RefreshIcon color="inherit" sx={{ display: 'block' }} />
                                    </IconButton>
                                </Tooltip>
                            </Grid>}
                            {!b && <Grid item>
                                <Button variant="contained" sx={{ mr: 1 }} component={Link} to='/addUser'>
                                    הוספת משתמש

                                </Button>
                                <Tooltip title="Reload">
                                    <IconButton>
                                        <RefreshIcon color="inherit" sx={{ display: 'block' }} />
                                    </IconButton>
                                </Tooltip>
                            </Grid>}
                        </Grid>
                    </Toolbar>
                </AppBar>
                <Typography sx={{ my: 5, mx: 2 }} color="text.secondary" align="center">
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    {!b && <TableCell align="right">אימייל</TableCell>}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {!b && users[0].users.map((user) => (
                                    <TableRow
                                        key={user.name}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">
                                            {user.name}
                                        </TableCell>
                                        <TableCell align="right">{user.email}</TableCell>
                                    </TableRow>
                                ))}
                                {b && children[0].children.map((child) => (
                                    <TableRow
                                        key={child.name}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">
                                            {child.name}
                                            <Avatar alt="Remy Sharp" src={`http://localhost:3000/${child.image}`} />
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Typography>
            </Paper>}
        </React.Fragment>
    );
}
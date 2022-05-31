import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import Autocomplete from '@mui/material/Autocomplete'
import NavLink from '../../user/components/NavLinks';
import { green } from '@mui/material/colors';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import AvatarGroup from '@mui/material/AvatarGroup';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import './Coloring.css';

let child = [];
let name;
let first = 'שם הילד\ה';
const Form = (props) => {
    const [firstKide, setFirstKide] = useState(null);
    const [secondtKide, setSecondKide] = useState(null);
    const [children, setChildren] = useState([])
    const history = useHistory();
    const [isReady, setIsReady] = useState(false);
    const [items, setItems] = useState([]);

    const breadcrumbs = [
        <Typography key="1" color="text.primary" component={Link} to='/'>
            תפריט ראשי
        </Typography>,
        <Typography key="2" color="text.primary">
            בחירת ילדים
        </Typography>,
    ];

    useEffect(() => {
        getAllChildren();
    }, [])

    const getAllChildren = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/users/children/', {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const responseData = await response.json();
            setChildren(responseData.children)
            child = children.children;
            setIsReady(true);
        } catch (err) {
            console.log(err);
        }
    }

    const onSubmit = async event => {
        setItems([firstKide, secondtKide]);
        localStorage.setItem('firstKide', JSON.stringify(firstKide));
        localStorage.setItem('secondtKide', JSON.stringify(secondtKide));
    }

    return (
        <React.Fragment>
            <NavLink />
            <Stack spacing={2} >
                <Breadcrumbs
                    sx={{ marginTop: 1, marginLeft: 3 }}
                    separator={<NavigateNextIcon fontSize="small" />}
                    aria-label="breadcrumb"
                >
                    {breadcrumbs}
                </Breadcrumbs>
            </Stack>
            {isReady && <Box component="main" sx={{ display: 'flex', marginTop: '8px', placeContent: 'center' }}>
                <Box sx={{ textAlignLast: 'center', width: 620, height: 470, borderRight: 'dotted', borderTop: 'solid', borderLeft: 'solid', borderBottom: 'solid', textAlign: '-webkit-center' }}>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', placeContent: 'center', justifyContent: 'space-evenly' }}>
                        {children.slice(0, 8).map((child) => {
                            return <Avatar key={child.id} onClick={() => setFirstKide(child)} sx={{ width: 100, height: 100 }} alt={child.name} src={`http://localhost:3000/${child.image}`} />
                        })}
                    </Box>
                    <Autocomplete
                        onChange={(event, value) => { 
                            setFirstKide(value) 
                            first = value 
                        }}
                        id="country-select-demo"
                        sx={{ width: '300px', marginTop: '35px' }}
                        options={children}
                        autoHighlight
                        getOptionLabel={(option) => option.name}
                        renderOption={(props, option) => (
                            <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                                <img
                                    loading="lazy"
                                    width="20"
                                    src={`http://localhost:3000/${option.image}`}
                                    alt=""
                                />
                                {option.name}
                            </Box>
                        )}
                        renderInput={(params) => (
                            <TextField
                                value={name}
                                {...params}
                                label={"שם הילד/ה"}
                                inputProps={{
                                    ...params.inputProps,
                                    autoComplete: 'new-password', // disable autocomplete and autofill
                                }}
                            />
                        )}
                    />
                    {firstKide === null && <Avatar sx={{ bgcolor: '#4454a3', width: 150, height: 150, marginTop: '12px' }}></Avatar>}
                    {firstKide !== null && <Avatar alt={firstKide.name} src={`http://localhost:3000/${firstKide.image}`} sx={{ width: 150, height: 150, marginTop: '12px' }}></Avatar>}
                </Box>
                <Box sx={{ textAlignLast: 'center', width: 620, height: 470, borderRight: 'solid', borderTop: 'solid', borderBottom: 'solid', textAlign: '-webkit-center' }}>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', placeContent: 'center', justifyContent: 'space-evenly' }}>
                        {children.slice(0, 8).map((child) => {
                            return <Avatar key={child.id} onClick={() => setSecondKide(child)} sx={{ width: 100, height: 100 }} alt={child.name} src={`http://localhost:3000/${child.image}`} />
                        })}
                    </Box>
                    <Autocomplete
                        onChange={(event, value) => setSecondKide(value)}
                        id="country-select-demo"
                        sx={{ width: '300px', marginTop: '35px' }}
                        options={children}
                        autoHighlight
                        getOptionLabel={(option) => option.name}
                        renderOption={(props, option) => (
                            <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                                <img
                                    loading="lazy"
                                    width="20"
                                    src={`http://localhost:3000/${option.image}`}
                                    alt=""
                                />
                                {option.name}
                            </Box>
                        )}
                        renderInput={(params) => (
                            <TextField
                                value={name}
                                {...params}
                                label={"שם הילד/ה"}
                                inputProps={{
                                    ...params.inputProps,
                                    autoComplete: 'new-password', // disable autocomplete and autofill
                                }}
                            />
                        )}
                    />
                    {secondtKide === null && <Avatar sx={{ bgcolor: '#4454a3', width: 150, height: 150, marginTop: '12px' }}></Avatar>}
                    {secondtKide !== null && <Avatar alt={secondtKide.name} src={`http://localhost:3000/${secondtKide.image}`} sx={{ width: 150, height: 150, marginTop: '12px' }}></Avatar>}
                </Box>
            </Box>}
            {(firstKide === null) && (secondtKide === null) && <Button sx ={{right: '5px', position: 'absolute'}} type='submit' disabled>המשך</Button>}
            {(firstKide !== null) && (secondtKide === null) && <Button sx ={{right: '5px', position: 'absolute'}} type='submit' disabled>המשך</Button>}
            {(firstKide === null) && (secondtKide !== null) && <Button sx ={{right: '5px', position: 'absolute'}} type='submit' disabled >המשך</Button>}
            {(secondtKide !== null) && (firstKide !== null) && <Button sx ={{right: '5px', position: 'absolute'}} type='submit' onClick={onSubmit} component={Link} to="/drawing/color">המשך</Button>}
        </React.Fragment>
    )
};

export default Form;

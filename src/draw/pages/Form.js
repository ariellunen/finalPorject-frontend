import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Link } from 'react-router-dom';
import Autocomplete from '@mui/material/Autocomplete'
import NavLink from '../../user/components/NavLinks';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import './Coloring.css';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import CircularProgress from '@mui/material/CircularProgress';

let uniquee = [];
let lastKides = [];
const Form = (props) => {
    const [firstKide, setFirstKide] = useState(null);
    const [secondKide, setSecondKide] = useState(null);
    const [children, setChildren] = useState([])
    const [isReady, setIsReady] = useState(false);
    const [data, setData] = useState(false);
    const [loading, setLoading] = useState(false)
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
        if (children.length !== 0) {
            handleKide();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isReady, children.length])

    const handleKide = () => {
        for (let j = 0; j < data.length; j++) {
            for (let i = 0; i < children.length; i++) {
                if (children[i].id === data[j].firstKide || children[i].id === data[j].secondKide) {
                    lastKides.push(children[i])
                }
            }
        }
        const uniqueIds = new Set();

        uniquee = lastKides.filter(element => {
            const isDuplicate = uniqueIds.has(element.id);
            uniqueIds.add(element.id);
            if (!isDuplicate) {
                return true;
            }
            return false;
        });
        setLoading(true)
    }

    const getAllChildren = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_BECKEND_URL}/drawing/`, {
            });
            const responseData = await response.json();
            setData(responseData.drawing.reverse());

        } catch (err) {
            console.log(err);
        }
        try {
            const response = await fetch(`${process.env.REACT_APP_BECKEND_URL}/users/children/`, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const responseData = await response.json();
            setChildren(responseData.children)
            setIsReady(true);
        } catch (err) {
            console.log(err);
        }

    }

    const onSubmit = async event => {
        localStorage.setItem('firstKide', JSON.stringify(firstKide));
        localStorage.setItem('secondKide', JSON.stringify(secondKide));
    }

    return (
        <React.Fragment>
            <NavLink />
            <Stack spacing={2} dir='ltr'>
                <Breadcrumbs
                    sx={{ marginTop: 1, marginLeft: 3 }}
                    separator={<NavigateNextIcon fontSize="small" />}
                    aria-label="breadcrumb"
                >
                    {breadcrumbs}
                </Breadcrumbs>
            </Stack>
            {!loading && <CircularProgress sx={{ position: 'fixed', top: '50%', left: '50%', height: '100px', width: '100px' }} />}
            {loading && <Box dir='ltr' component="main" sx={{ display: 'flex', marginTop: '8px', placeContent: 'center', height: '100%', overflow: 'hidden' }}>
                <Box sx={{ textAlignLast: 'center', width: 620, height: 470, borderRight: 'dotted', borderTop: 'solid', borderLeft: 'solid', bgcolor: 'white', borderBottom: 'solid', textAlign: '-webkit-center' }}>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', placeContent: 'center', justifyContent: 'space-evenly', width: '75%' }}>
                        {uniquee.length <= 8 && children.map((child) => {
                            console.log(`C:/${child.image}`)
                            return <Avatar key={child.id} onClick={() => setFirstKide(child)} sx={{ width: 100, height: 100, marginTop: '5px' }} alt={child.name} src={`C:/${child.image}`} />
                        })}
                        {uniquee.length > 8 && uniquee.slice(0, 8).map((child) => {
                            console.log(`C:/${child.image}`)
                  
                            return <Avatar key={child.id} onClick={() => setFirstKide(child)} sx={{ width: 100, height: 100, marginTop: '5px' }} alt={child.name} src={`C:/${child.image}`} />
                        })}
                    </Box>
                    <Autocomplete
                        onChange={(event, value) => setFirstKide(value)}
                        id="country-select-demo"
                        sx={{ width: '300px', marginTop: '35px' }}
                        options={children}
                        autoHighlight
                        value={firstKide?.id || ''}
                        getOptionLabel={(option) => {
                            // Value selected with enter, right from the input
                            if (typeof option === 'string') {
                                return children.find(c => c.id === option)?.name || '';
                            }
                            // Add "xxx" option created dynamically
                            if (option.inputValue) {
                                return option.inputValue;
                            }
                            // Regular option
                            return option.name;
                        }}
                        isOptionEqualToValue={(opt, value) => {
                            return opt.id === value
                        }}

                        renderOption={(props, option) => (
                            <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                                <img
                                    loading="lazy"
                                    width="20"
                                    src={`C:/${option.image}`}
                                    alt=""
                                />
                                {option.name}
                            </Box>
                        )}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label={"שם הילד/ה"}
                                inputProps={{
                                    ...params.inputProps,
                                    autoComplete: 'new-password', // disable autocomplete and autofill
                                }}
                            />
                        )}
                    />
                    {firstKide === null && <Avatar sx={{ bgcolor: '#ccccd4', width: 120, height: 120, marginTop: '22px' }}></Avatar>}
                    {firstKide !== null && <Avatar alt={firstKide.name} src={`C:/${firstKide.image}`} sx={{ width: 150, height: 150, marginTop: '12px' }}></Avatar>}
                </Box>
                <Box sx={{ textAlignLast: 'center', width: 620, height: 470, borderRight: 'solid', bgcolor: 'white', borderTop: 'solid', borderBottom: 'solid', textAlign: '-webkit-center' }}>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', placeContent: 'center', justifyContent: 'space-evenly', width: '75%' }}>
                        {uniquee.length <= 8 && children.map((child) => {
                            return <Avatar key={child.id} onClick={() => setSecondKide(child)} sx={{ width: 100, height: 100, marginTop: '5px' }} alt={child.name} src={`${process.env.REACT_APP_ASSET_URL}/${child.image}`} />
                        })}
                        {uniquee.length > 8 && uniquee.slice(0, 8).map((child) => {
                            return <Avatar key={child.id} onClick={() => setSecondKide(child)} sx={{ width: 100, height: 100, marginTop: '5px' }} alt={child.name} src={`${process.env.REACT_APP_ASSET_URL}/${child.image}`} />
                        })}
                    </Box>
                    <Autocomplete
                        onChange={(event, value) => setSecondKide(value)}
                        id="country-select-demo"
                        sx={{ width: '300px', marginTop: '35px' }}
                        options={children}
                        autoHighlight
                        value={secondKide?.id || ''}
                        // getOptionLabel={(option) => {
                        //     return children.find(c => c.id === option)?.name || ''
                        // }}
                        isOptionEqualToValue={(opt, value) => {
                            return opt.id === value
                        }}
                        getOptionLabel={(option) => {
                            // Value selected with enter, right from the input
                            if (typeof option === 'string') {
                                return children.find(c => c.id === option)?.name || '';
                            }
                            // Add "xxx" option created dynamically
                            if (option.inputValue) {
                                return option.inputValue;
                            }
                            // Regular option
                            return option.name;
                        }}
                        renderOption={(props, option) => (
                            <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                                <img
                                    loading="lazy"
                                    width="20"
                                    src={`C:/${option.image}`}
                                    alt=""
                                />
                                {option.name}
                            </Box>
                        )}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label={"שם הילד/ה"}
                                inputProps={{
                                    ...params.inputProps,
                                    autoComplete: 'new-password', // disable autocomplete and autofill
                                }}
                            />
                        )}
                    />
                    {secondKide === null && <Avatar sx={{ bgcolor: '#ccccd4', width: 120, height: 120, marginTop: '22px' }}></Avatar>}
                    {secondKide !== null && <Avatar alt={secondKide?.name} src={`C:/${secondKide.image}`} sx={{ width: 150, height: 150, marginTop: '12px' }}></Avatar>}
                </Box>
                {(firstKide === null) && (secondKide === null) && <Button sx={{ right: '5px', position: 'absolute', bottom: '4px' }} type='submit' disabled endIcon={<ArrowRightAltIcon sx={{ marginLeft: '-30px', height: '30px', width: '80px' }} />}>המשך</Button>}
                {(firstKide !== null) && (secondKide === null) && <Button sx={{ right: '5px', position: 'absolute', bottom: '4px' }} type='submit' disabled endIcon={<ArrowRightAltIcon sx={{ marginLeft: '-30px', height: '30px', width: '80px' }} />}>המשך</Button>}
                {(firstKide === null) && (secondKide !== null) && <Button sx={{ right: '5px', position: 'absolute', bottom: '4px' }} type='submit' disabled endIcon={<ArrowRightAltIcon sx={{ marginLeft: '-30px', height: '30px', width: '80px' }} />}>המשך</Button>}
                {(secondKide !== null) && (firstKide !== null) && <Button sx={{ right: '5px', position: 'absolute', bottom: '4px' }} type='submit' onClick={onSubmit} component={Link} to="/drawing/color" endIcon={<ArrowRightAltIcon sx={{ marginLeft: '-30px', height: '30px', width: '80px' }} />}>המשך</Button>}
            </Box>}
        </React.Fragment>
    )
};

export default Form;




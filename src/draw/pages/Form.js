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

let child = [];
let name;
const Form = (props) => {
    const [firstKide, setFirstKide] = useState('');
    const [secondtKide, setSecondKide] = useState('');
    const [children, setChildren] = useState([])
    const history = useHistory();
    const [isReady, setIsReady] = useState(false);
    const [items, setItems] = useState([]);

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
        console.log(items)
        localStorage.setItem('firstKide', JSON.stringify(firstKide));
        localStorage.setItem('secondtKide', JSON.stringify(secondtKide));
    }
    console.log(secondtKide)
    console.log(firstKide)

    return (
        <React.Fragment>
            <NavLink />
            {/* <Box component="main" sx={{ marginTop: '40px', textAlignLast: 'center', position: 'relative', whiteSpace: 'nowrap' }}> */}
            <Box component="main" sx={{ display: 'flex', marginTop: '40px', placeContent: 'center' }}>
                <Box sx={{ textAlignLast: 'center', width: 620, height: 470, borderRight: 'dotted', borderTop: 'solid', borderLeft: 'solid', borderBottom: 'solid' }}>
                    <Autocomplete
                        onChange={(event, value) => setFirstKide(value.name)}
                        id="country-select-demo"
                        sx={{ width: 300 }}
                        options={children}
                        autoHighlight
                        getOptionLabel={(option) => option.name}
                        renderOption={(props, option) => (
                            <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                                {/* <img
                                loading="lazy"
                                width="20"
                                // src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                                srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                                alt=""
                            /> */}
                                {option.name}
                            </Box>
                        )}
                        renderInput={(params) => (
                            <TextField
                                value={name}
                                {...params}
                                label="שם הילד/ה"
                                inputProps={{
                                    ...params.inputProps,
                                    autoComplete: 'new-password', // disable autocomplete and autofill
                                }}
                            />
                        )}
                    />
                </Box>
                <Box sx={{ textAlignLast: 'center', width: 620, height: 470, borderLeft: 'none', borderTop: 'solid', borderRight: 'solid', borderBottom: 'solid' }}>
                    <Autocomplete
                        onChange={(event, value) => setSecondKide(value.name)}
                        id="country-select-demo"
                        sx={{ width: 300, background: 'lightGrey', borderRadius: 10 }}
                        options={children}
                        autoHighlight
                        getOptionLabel={(option) => option.name}
                        renderOption={(props, option) => (
                            <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                                {option.name}
                            </Box>
                        )}
                        renderInput={(params) => (
                            // <SearchIcon />
                            <TextField
                                {...params}
                                label="שם הילד/ה"
                                inputProps={{
                                    ...params.inputProps,
                                    autoComplete: 'new-password', // disable autocomplete and autofill
                                }}
                            />
                        )}

                    />
                </Box>

            </Box>
            {isReady &&
                <Box>
                    {/* <Autocomplete
                        onChange={(event, value) => setFirstKide(value.name)}
                        id="country-select-demo"
                        sx={{ width: 300, position: 'absolute' }}
                        options={children}
                        autoHighlight
                        getOptionLabel={(option) => option.name}
                        renderOption={(props, option) => (
                            <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                                {/* <img
                                loading="lazy"
                                width="20"
                                // src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                                srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                                alt=""
                        /> }
                                {option.name}
                            </Box>
                        )}
                        renderInput={(params) => (
                            <TextField
                                value={name}
                                {...params}
                                label="ילד 1"
                                inputProps={{
                                    ...params.inputProps,
                                    autoComplete: 'new-password', // disable autocomplete and autofill
                                }}
                            />
                        )}
                    /> */}

                    <Button variant="contained" type='submit' onClick={onSubmit} component={Link} to="/drawing/color">המשך</Button>
                </Box>}
        </React.Fragment>
    )
};

export default Form;

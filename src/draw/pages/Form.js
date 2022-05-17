import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import Autocomplete from '@mui/material/Autocomplete'

let child = [];
const Form = (props) => {
    const [firstKide, setFirstKide] = useState('');
    const [secondtKide, setSecondKide] = useState('');
    const [children, setChildren] = useState([])
    const history = useHistory();
    const [isReady, setIsReady] = useState(false);

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
            console.log(children)
            child = children.children;
            setIsReady(true);

        } catch (err) {
            console.log(err);
        }
    }

    const onChangeFisrt = (e) => {
        console.log(e.target.value)
        setFirstKide(e.target.value);
    }

    const onChangeSecond = (e) => {
        setSecondKide(e.target.value);
    }

    const onSubmit = async event => {
        try {
            const response = await fetch('http://localhost:3000/api/users/signupChild/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: firstKide
                })
            });

            const responseData = await response.json();
            console.log(responseData);

        } catch (err) {
            console.log(err);
        }

        try {
            const response = await fetch('http://localhost:3000/api/users/signupChild/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: secondtKide
                })
            });

            const responseData = await response.json();
            console.log(responseData);
        } catch (err) {
            console.log(err);
        }
    }

    return (
        // child.length !== 0 && <Box component="form"
        //     sx={{ '& > :not(style)': { m: 1, width: '25ch' }, }}
        //     noValidate
        //     autoComplete="off"
        // >
        //     <Autocomplete
        //         disablePortal
        //         id="combo-box-demo"
        //         options={child}
        //         sx={{ width: 300 }}
        //         renderInput={(params) => <TextField {...params} label="Movie" />}
        //     />
        <React.Fragment>
            {isReady && <Box>
                <Autocomplete
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
                        onChange={onChangeFisrt} value={firstKide}
                            {...params}
                            label="ילד 1"
                            inputProps={{
                                ...params.inputProps,
                                autoComplete: 'new-password', // disable autocomplete and autofill
                            }}
                        />
                    )}
                />
                <Autocomplete
                    id="country-select-demo"
                    sx={{ width: 300 }}
                    options={children}
                    autoHighlight
                    getOptionLabel={(option) => option.name}
                    renderOption={(props, option) => (
                        <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                            {option.name}
                        </Box>
                    )}
                    renderInput={(params) => (
                        <TextField
                        onChange={onChangeSecond} value={secondtKide}
                            {...params}
                            label="ילד 2"
                            inputProps={{
                                ...params.inputProps,
                                autoComplete: 'new-password', // disable autocomplete and autofill
                            }}
                        />
                    )}
                />
                {/* <h2>ילד 1</h2>
                <TextField id="outlined-basic" label="שם" variant="outlined" onChange={onChangeFisrt} value={firstKide} />
                <h2>ילד 2</h2>
                <TextField id="outlined-basic" label="שם" variant="outlined" onChange={onChangeSecond} value={secondtKide} /> */}
                <Button variant="contained" type='submit' onClick={onSubmit} component={Link} to="/drawing/color">המשך</Button>
            </Box>}
        </React.Fragment>
    )
};

export default Form;

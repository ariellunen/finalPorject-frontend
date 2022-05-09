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
            setChildren(responseData)
            console.log(responseData)
            child = children.children;

        } catch (err) {
            console.log(err);
        }
    }

    const onChangeFisrt = (e) => {
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
        <Box>
            <h2>ילד 1</h2>
            <TextField id="outlined-basic" label="שם" variant="outlined" onChange={onChangeFisrt} value={firstKide} />
            <h2>ילד 2</h2>
            <TextField id="outlined-basic" label="שם" variant="outlined" onChange={onChangeSecond} value={secondtKide} />
            <Button variant="contained" type='submit' onClick={onSubmit} component={Link} to="/drawing/color">המשך</Button>
        </Box>
    )
};

export default Form;
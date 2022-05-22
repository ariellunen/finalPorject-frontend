import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import Autocomplete from '@mui/material/Autocomplete'

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
        // setItems(firstKide, secondtKide)
    }
    console.log(secondtKide)
    console.log(firstKide)

    return (
        <React.Fragment>
            {isReady && <Box>
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
                            label="ילד 1"
                            inputProps={{
                                ...params.inputProps,
                                autoComplete: 'new-password', // disable autocomplete and autofill
                            }}
                        />
                    )}
                />
                <Autocomplete
                    onChange={(event, value) => setSecondKide(value.name)}
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

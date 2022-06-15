import React, { useState, useContext } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import Box from '@mui/material/Box';

const AutoSearch = (props) => {
    return (
        <Autocomplete
            dir='ltr'
            value={props.value}
            onChange={(event, value) => props.handleValue(value)}
            onInputChange={(event, value) => props.onInputChange(value)}
            selectOnFocus
            clearOnBlur
            handleHomeEndKeys
            sx={{
                textAlignLast: 'right',
                width: '80%', 
                bgcolor: 'white',
                height:'55px'
            }}
            id="free-solo-with-text-demo"
            options={props.allKide}
            getOptionLabel={(option) => {
                if (typeof option === 'string') {
                    return option;
                }
                if (option.inputValue) {
                    return option.inputValue;
                }
                //props.handleTextChanage(option)
                return option.name;
            }}
            renderOption={(props, option) => <li {...props}>{option.name}</li>}
            freeSolo
            InputProps={{
                color: 'red',
                backgroundColor: "blue",

            }}
            renderInput={(params) => (
                <TextField {...params} label="שם הילד\ה" sx={{ textAlignLast: 'right', }} />
            )}
        />
    )
}

export default AutoSearch;

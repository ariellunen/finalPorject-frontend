import React, { useState, useContext } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

const AutoSearch = (props) => {
    return (
        <Autocomplete
        value={props.value}
        onChange={(event, value) => props.handleValue(value)}
        onInputChange={(event, value) => props.handleTextChanage(value)}
        selectOnFocus
        clearOnBlur
        handleHomeEndKeys
        id="free-solo-with-text-demo"
        options={props.allKide}
        getOptionLabel={(option) => {
            if (typeof option === 'string') {
                return option;
            }
            if (option.inputValue) {
                return option.inputValue;
            }
            return option.name;
        }}
        renderOption={(props, option) => <li {...props}>{option.name}</li>}
        sx={{ width: 300 }}
        freeSolo
        renderInput={(params) => (
            <TextField {...params} label="שם הילד\ה" />
        )}
    />
    )
}

export default AutoSearch;

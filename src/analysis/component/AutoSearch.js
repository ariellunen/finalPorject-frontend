import React from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
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
                width: '70%',
                bgcolor: 'white',
                height: '55px'
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
                <TextField {...params} placeholder="שם הילד\ה" color='primary' sx={{ textAlignLast: 'right', color: 'primary' }} />
            )}

        />

    )
}

export default AutoSearch;

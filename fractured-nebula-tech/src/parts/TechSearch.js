import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

export default function TechSearch(props) {
    console.info(props.techs);
    return (
        <Autocomplete
            disablePortal
            id="techSearch"
            options={props.techs.map(tech=>tech.id)}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Tech" />}
        />
    );
}
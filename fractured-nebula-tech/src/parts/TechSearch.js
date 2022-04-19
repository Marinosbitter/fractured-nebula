import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

export default function TechSearch(props) {
    return (
        <Autocomplete
            value={props.selectedTech}
            disablePortal
            id="techSearch"
            options={props.techs.map(tech => tech.id)}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Tech" />}
            onChange={(event, newValue) => { props.setSelectedTech(newValue) }}
        />
    );
}
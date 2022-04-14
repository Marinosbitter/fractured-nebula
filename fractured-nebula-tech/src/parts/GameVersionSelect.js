import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

export default function TechSearch(props) {
    console.info(props.gameVersions);
    return (
        <Autocomplete
            disablePortal
            id="gameVersionSelect"
            options={props.gameVersions.map(version=>version)}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Game Version" />}
        />
    );
}
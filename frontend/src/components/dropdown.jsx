import {React, useState} from 'react'
import {FormControl, Select, MenuItem, InputLabel, Box, TextField, Stack, Autocomplete} from '@mui/material'
export default function Dropdown(props){

    const handleChange = (e, newValue, field) => {
        console.log(props.data);
        const newData = {...props.data}
        newData[field] = newValue;
        props.setData(newData);
        console.log(newData);
    };

    {
        if(props.multiple){
            return(
            <Autocomplete
                id="free-solo-demo"
                options={props.options}
                renderInput={(params) => <TextField {...params} label={props.field} />}
                onChange={(e, newValue)=>handleChange(e, newValue, props.field)}
                onInputChange={(e, newValue)=>handleChange(e, newValue, props.field)}
                label={props.field}
                value={props.data[props.field]}
                freeSolo
                multiple
            />
            );
        } else {
            return(
            <Autocomplete
                id="free-solo-demo"
                options={props.options}
                renderInput={(params) => <TextField {...params} label={props.field} />}
                onChange={(e, newValue)=>handleChange(e, newValue, props.field)}
                onInputChange={(e, newValue)=>handleChange(e, newValue, props.field)}
                label={props.field}
                value={props.data[props.field]}
                freeSolo
            />
            );
        }
    }
}
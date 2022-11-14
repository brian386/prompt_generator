import {React, useState} from 'react'
import {FormControl, Select, MenuItem, InputLabel, Box, TextField, Button, IconButton, ToggleButton, ToggleButtonGroup} from '@mui/material'

export default function OptionSelection(props) {

  const handleChange = (event, newShow) => {
    props.setShowData(newShow);
  };

  return (
    <div>
        <ToggleButtonGroup
        value={props.showData}
        onChange={handleChange}
        aria-label="text formatting"
        >
            {
                Object.keys(props.data).map((field, i) => (
                    <ToggleButton value={field} aria-label={field} key={i}>
                        {field}
                    </ToggleButton>
                ))
            }
        </ToggleButtonGroup>
        <br/>
    </div>
  );
}
import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

const BasicTextFields = (props) => {

    const [userText, setText] = useState("");

    const handleChange = (event) => setText(event.target.value);

    return (
        <Box
          component="form"
          sx={{
            '& > :not(style)': { m: 1.5, width: '40ch'},
          }}
          noValidate
          autoComplete="off"
        >
          <TextField 
            id="filled-basic" 
            label={props.label} 
            value={userText} 
            onChange={handleChange}
            variant="filled" 
            InputLabelProps={{style: {color: 'white'}}} 
            inputProps={{style: { color: 'white' }}}/>
        </Box>
      );
}

export default BasicTextFields
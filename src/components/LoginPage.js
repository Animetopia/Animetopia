import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Card, Typography, CardContent, Stack, Button, Box, TextField } from '@mui/material';

const LoginPage = (props) => {

  const [loginForm, setForm] = useState({
      username: "",
      password: ""
  }); 

  const navigate = useNavigate();
  
  // function to update the state
  function updateForm(value){
      return setForm((prev) => {
          return {...prev, ...value};
      });
  }

  function handleSubmit(){ 
      // handle submit for login action - send login info to backend to check against the password in DB
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginForm)
      };
      fetch('/user/login', requestOptions)
        .then(response => response.json())
        .then(data => {
          console.log(data)
          setForm({username: "", password: ""});
          navigate("/home"); 
        })
        .catch(error => console.error(error));
    }

  function directToSignUp(){
    navigate("/signup");
  }

  return (
    <Card sx={{ minWidth: 600, minHeight: 350, backgroundColor: 'rgba(128, 128, 128, 0.8)'}}>
      <CardContent sx={{ marginTop: '20px' }}>
        <Typography variant="h5" component="div" sx={{fontSize: '32px', fontWeight: '700', color: 'white', fontFamily: 'Arial'}}>
          Animetopia
        </Typography>
        <Typography sx={{ fontSize: 14, marginBottom: '15px', color: 'white', marginTop: '5px', fontFamily: 'Arial'}} color="text.secondary">
          To our community of passionate, curious anime watchers
        </Typography>
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
            label="Enter your username" 
            value={loginForm.username} 
            onChange={(e) => updateForm({username: e.target.value})}
            variant="filled" 
            InputLabelProps={{style: {color: 'white'}}} 
            inputProps={{style: { color: 'white' }}}/>
          </Box>
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
            label="Enter your password" 
            value={loginForm.password} 
            onChange={(e) => updateForm({password: e.target.value})}
            variant="filled" 
            InputLabelProps={{style: {color: 'white'}}} 
            inputProps={{style: { color: 'white' }}}/>
          </Box>
        <div className = "buttonContainer" style={{ marginTop: '20px' }}>
          <Stack spacing={5} direction="row">
            <Button variant="contained" onClick={handleSubmit}>Submit</Button>
            <Button variant="contained" onClick={directToSignUp}>Sign Up</Button>
          </Stack>
        </div>
      </CardContent>
    </Card>
  )
}

export default LoginPage
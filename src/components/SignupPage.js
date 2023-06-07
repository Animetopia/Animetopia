import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Card, Typography, CardContent, Stack, Button, Box, TextField } from '@mui/material';

const SignupPage = (props) => {

  const [signupForm, setForm] = useState({
      username: "",
      password: "",
      email: "",
      avatar_url: "https://pic.onlinewebfonts.com/svg/img_568656.png"
  });

  const navigate = useNavigate();

  // function to update the state
  function updateForm(value){
    return setForm((prev) => {
        return {...prev, ...value};
    });
  }

  function directToLogin(){ 
    navigate("/");  
  }

  const handleSubmit = () => {
    console.log("signupForm: ", signupForm)
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(signupForm)
    };
    fetch('/user/signup', requestOptions)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        props.setUserId(data.id);
        setForm({username: "", password: "", email: ""});
        navigate("/home");
      })
      .catch(error => console.error(error)); 
  }
    
    return (
      <Card sx={{ minWidth: 600, minHeight: 350, backgroundColor: 'rgba(128, 128, 128, 0.8)'}}>
        <CardContent sx={{ marginTop: '20px' }}>
          <Typography variant="h5" component="div" sx={{fontSize: '32px', fontWeight: '700', color: 'white', fontFamily: 'Arial'}}>
            Animetopia
          </Typography>
          <Typography sx={{ fontSize: 14, marginBottom: '15px', color: 'white', marginTop: '5px', fontFamily: 'Arial'}} color="text.secondary">
            An Anime and Manga-based Community
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
            label="Username:" 
            value={signupForm.username} 
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
            label="Password:" 
            value={signupForm.password} 
            onChange={(e) => updateForm({password: e.target.value})}
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
            label="Email:" 
            value={signupForm.email} 
            onChange={(e) => updateForm({email: e.target.value})}
            variant="filled" 
            InputLabelProps={{style: {color: 'white'}}} 
            inputProps={{style: { color: 'white' }}}/>
          </Box>
          <div className = "buttonContainer" style={{ marginTop: '20px' }}>
            <Stack spacing={5} direction="row">
              <Button variant="contained" onClick = {handleSubmit}>Submit</Button>
              <Button variant="contained" onClick = {directToLogin}>Log In</Button>
            </Stack>
          </div>
        </CardContent>
      </Card>
    )
}

export default SignupPage
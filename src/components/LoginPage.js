import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Card, Typography, CardContent, Stack, Button } from '@mui/material';
import BasicTextFields from './BasicTextFields';

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
      fetch('/api/user/login', requestOptions)
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
        <BasicTextFields label="Enter your username" onChange={(e) => updateForm({username: e.target.value})} />
        <BasicTextFields label="Enter your password" onChange={(e) => updateForm({password: e.target.value})} />
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
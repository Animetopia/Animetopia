import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Card, Typography, CardContent, Stack, Button } from '@mui/material';
import BasicTextFields from './BasicTextFields';

const SignupPage = (props) => {

  const [signupForm, setForm] = useState({
      username: "",
      password: "",
      email: ""
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
          <BasicTextFields label="Username:" onChange={(e) => updateForm({username: e.target.value})}/>
          <BasicTextFields label="Password:" onChange={(e) => updateForm({password: e.target.value})}/>
          <BasicTextFields label="Email:" onChange={(e) => updateForm({email: e.target.value})}/>
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
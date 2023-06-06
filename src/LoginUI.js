import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import {useNavigate} from "react-router-dom";
import { Axios } from 'axios';


const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);
export function BasicTextFields(props) {
  const [userText, setText] = useState("");

  const handleChange = (event) => {
    setText(event.target.value);
  };
  return (
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1.5, width: '40ch'},
      }}
      noValidate
      autoComplete="off"
    >
      {/* <TextField id="outlined-basic" label="Outlined" variant="outlined" /> */}
      {/* <div className="textFieldContainer" style={{ display: 'flex' }}> */}
        {/* <TextField id="filled-basic" label = "Enter password" variant="filled" /> */}
      {/* </div> */}
      <TextField id="filled-basic" label={props.label} value={userText} onChange={handleChange} variant="filled" InputLabelProps={{style: {color: 'white'}}} inputProps={{style: { color: 'white' }}}/>
      {/* <TextField id="standard-basic" label="Standard" variant="standard" /> */}
    </Box>
  );
}


export function BasicButtons(){
  const navigate = useNavigate();
  function directLogin(){ 
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
    // After successful login user should be redirected to their home page
}
  function directSignUp(){
    navigate("/signup");
  // const navigate = useNavigate();
  // const handleLoginClick = () => {
  //   // Redirect to a new page
  //   navigate('/dashboard');
  // };
  return (
    <div className = "buttonContainer" style={{ marginTop: '20px' }}>
      <Stack spacing={5} direction="row">
      <Button variant="contained" onClick={directLogin}>Log In</Button>
      <Button variant="contained" onClick={directSignUp}>Sign Up</Button>
      {/* <Button variant="outlined">Log In</Button> */}
    </Stack>
    </div>
  );
}
export function BasicButtonsSignUp() {
  const navigate = useNavigate();
  function directToLogin(){ 
    navigate("/");  
  }

  function registerUser(email, username, password) {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email, password })
    };
    fetch('/api/user/signup', requestOptions)
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error(error));
  }

  function handleContinueClick() {
    // Call your register user function here
    registerUser(email, username, password);
    // Users should be redirected to the home page after registration
    navigate("/home");
  }
  //eventually implement continue button redirect here:
  return (
    <div className = "buttonContainer" style={{ marginTop: '20px' }}>
    <Stack spacing={5} direction="row">
      <Button variant="contained" onClick = {handleContinueClick}>Continue</Button>
      <Button variant="contained" onClick = {directToLogin}>Log In</Button>
    </Stack>
    </div>
  );
}
//how do i prop drill the value of the email from the signupcard component into the basicbuttons signup component
export function BasicCard() {
  const [loginForm, setForm] = useState({
    username: "",
    password: ""
  }); 

  // Function to update the form state 
  function updateForm(value){
    return setForm((prev) => {
        return {...prev, ...value};
    });
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
        {/* <Typography variant="body2">
          well meaning and kindly.
          <br />
          {'"a benevolent smile"'}
        </Typography> */}
        <BasicTextFields label="Enter your username" onChange={(e) => updateForm({username: e.target.value})}>
        </BasicTextFields>
        <BasicTextFields label="Enter your password" onChange={(e) => updateForm({password: e.target.value})}>
        </BasicTextFields>
        <BasicButtons sx={{ mt: 4 }} />
      </CardContent>
      <CardActions>
        <Button size="small"sx={{ color: '#F5F5F5', fontSize: '10px'}}>Learn More</Button>
      </CardActions>
    </Card>
  );
}

export function SignUpCard(){
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [userText, setText] = useState("");
  const handleChange = (event) => {
    setText(event.target.value);
  };
  function handleEmailChange(event) {
    console.log('this is the email: ', email);
    setEmail(event.target.value);
  }
  function handleUsernameChange(event) {
    setUsername(event.target.value);
  }
  function handlePasswordChange(event) {
    setPassword(event.target.value);
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
        <BasicTextFields label="Email:" value={email} onChange={handleEmailChange}/>
        <BasicTextFields label="Username:" value={username} onChange={handleUsernameChange}/>
        <BasicTextFields label="Password:" value={password} onChange={handlePasswordChange}/>
        <BasicButtonsSignUp sx={{ mt: 4 }} email={email}/> 
        {/* handle continue click */}
      </CardContent>
      <CardActions>
        <Button size="small"sx={{ color: '#F5F5F5', fontSize: '10px'}}>Learn More</Button>
      </CardActions>
    </Card>
  );
}
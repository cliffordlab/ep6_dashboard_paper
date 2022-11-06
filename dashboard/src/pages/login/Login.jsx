import React from 'react'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { config } from '../../environment';
import { useState } from 'react';
import { WifiProtectedSetupSharp } from '@mui/icons-material';
import { Redirect, useNavigate } from 'react-router-dom';

export default function Login(props) {

  // Setting states for variables
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [isConfirmed, setIsConfirmed] = useState(false);
  let navigate = useNavigate();


  const HandleSubmit = (event) => 
  {
    event.preventDefault();
    fetch(config.url.API_HOST + '/login', 
            {   method : "POST", 
                headers : { "Content-Type" : "application/json", },
                body : JSON.stringify({"email" : username, "password" : password})
        })
        .then(res => res.json())
        .then(data => {
            if(data.success){
                let authData = {"success" : data.success, 
                                "token" : data.token,
                                "email" : username}
                props.onchange(authData);
                navigate("/login");                
            }
            else{
                alert(data.msg);
                let authData = {"success" : false, "token" : "", "email" : ""};
                props.onchange(authData);
            }
        })
        .catch((error) => { console.log(error);});
  }

  return (
    <div>
        <Container component="main" maxWidth="xs">
        <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center', }}>
          
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          
          <Typography component="h1" variant="h5"> Sign in </Typography>
          
          <Box component="form" onSubmit={HandleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField margin="normal" required fullWidth id="email" label="Email Address" name="email" autoComplete="email" onChange={e => setUsername(e.target.value)} autoFocus/>
            <TextField margin="normal" required fullWidth name="password" label="Password" type="password" id="password" onChange={e => setPassword(e.target.value)} autoComplete="current-password" />
            <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Remember me" />
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} >Sign In </Button>
            
            <Grid container>
              <Grid item xs>
                <Link href="/forget-password" variant="body2"> Forgot password? </Link>
              </Grid>
              <Grid item>
                <Link href="/register" variant="body2"> {"New User ? Create Account"} </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </div>
  )
}

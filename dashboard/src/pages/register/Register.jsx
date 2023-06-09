import React, { useState } from 'react'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
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
import { useNavigate } from 'react-router-dom';

export default function Register() {

  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();


  const HandleSubmit = (event) => {
      event.preventDefault();

      fetch(config.url.API_HOST + '/register', 
      {   method : "POST", 
          headers : { "Content-Type" : "application/json", },
          body : JSON.stringify({"username" : firstName + " " + lastName  ,"email" : email, "password" : password})
      })
      .then(res => res.json())
      .then(data => {
          if(data.success){
              alert(data.msg);
              navigate("/login");
          }
          else{
              alert(data.msg);
          }
      })
      .catch((error) => { console.log(error);});
      }

  return (
    <div>
        <Container component="main" maxWidth="xs">
        <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center', }}>
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}> <LockOutlinedIcon /> </Avatar>
          <Typography component="h1" variant="h5"> Sign up </Typography>


          <Box component="form" noValidate onSubmit={HandleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              
              <Grid item xs={12} sm={6}>
                <TextField autoComplete="given-name" name="firstName" required fullWidth id="firstName" label="First Name" onChange={e => setFirstName(e.target.value)} autoFocus />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField required fullWidth id="lastName" label="Last Name" name="lastName" onChange={e => setLastName(e.target.value)} autoComplete="family-name" />
              </Grid>
              
              <Grid item xs={12}>
                <TextField required fullWidth id="email" label="Email Address" name="email" onChange={e => setEmail(e.target.value)} autoComplete="email" />
              </Grid>

              <Grid item xs={12}>
                <TextField required fullWidth name="password" label="Password" type="password" id="password" onChange={e => setPassword(e.target.value)} autoComplete="new-password" />
              </Grid>

            </Grid>

            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} > Sign Up </Button>
          </Box>

          <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
          </Grid>

        </Box>
      </Container>
    </div>
  )
}

import React, { useState, useContext } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Input from '../../shared/components/FormElements/Input';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE
} from '../../shared/util/validators';
import { useForm } from '../../shared/hooks/form-hook';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { AuthContext } from '../../shared/context/auth-context';
import './Auth.css';

// function Copyright(props) {
//   return (
//     <Typography variant="body2" color="text.secondary" align="center" {...props}>
//       {'Copyright © '}
//       <Link color="inherit" href="https://mui.com/">
//         {/* Your Website */}
//       </Link>{' '}
//       {new Date().getFullYear()}
//       {'.'}
//     </Typography>
//   );
// }

const Auth = () => {
  const auth = useContext(AuthContext);
  const [isLoginMode, setIsLoginMode] = useState(true);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const [formState, inputHandler, setFormData] = useForm(
    {
      email: {
        value: '',
        isValid: false
      },
      password: {
        value: '',
        isValid: false
      }
    },
    false
  );

  const authSubmitHandler = async event => {
    event.preventDefault();
    try {
      const responseData = await sendRequest(
        `${process.env.REACT_APP_BECKEND_URL}/users/login`,
        'POST',
        JSON.stringify({
          email: formState.inputs.email.value,
          password: formState.inputs.password.value
        }),
        {
          'Content-Type': 'application/json'
        }
      );
      auth.login(responseData.userId, responseData.token, responseData.email, responseData.userType);
    } catch (err) { }
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <Grid container component="main" sx={{height:'100vh', overflow: 'hidden'}}>
        <CssBaseline />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square sx={{height: '100%'}}>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: '#4454a3' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              כניסה למערכת
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <form onSubmit={authSubmitHandler}>
                <Input
                  element="input"
                  id="email"
                  type="email"
                  label="אימייל"
                  validators={[VALIDATOR_EMAIL()]}
                  errorText="יש להזין כתובת אימייל תקינה"
                  onInput={inputHandler}
                />
                <Input
                  element="input"
                  id="password"
                  type="password"
                  label="סיסמה"
                  validators={[VALIDATOR_MINLENGTH(6)]}
                  errorText="יש להזין סיסמא (לפחות 6 ספרות)"
                  onInput={inputHandler}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  // disabled={!formState.isValid}
                  sx={{ mt: 3, mb: 2, bgcolor: '#4454a3' }}
                >
                  כניסה
                </Button>
                {/* <Copyright sx={{ mt: 5 }} /> */}
              </form>
            </Box>

          </Box>
        </Grid>
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://i.postimg.cc/j2cmDRGQ/Breadcrumbs-8.png)',
            backgroundRepeat: 'no-repeat',
            backgroundSize: '450px',
            backgroundColor: '#e4ecf4',
            backgroundPosition: 'center',
          }}
        />

      </Grid>
    </React.Fragment>
  );
}

export default Auth;
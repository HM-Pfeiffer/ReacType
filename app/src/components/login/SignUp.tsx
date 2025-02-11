import React, { useState } from 'react';
import {
  RouteComponentProps,
  Link as RouteLink,
  withRouter
} from 'react-router-dom';
import {
  SigninDark,
  SigninLight
} from '../../../../app/src/public/styles/theme';
import {
  StyledEngineProvider,
  Theme,
  ThemeProvider
} from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Avatar,
  Button,
  Container,
  CssBaseline,
  Grid,
  TextField,
  Typography
} from '@mui/material';

import AssignmentIcon from '@mui/icons-material/Assignment';
import { LoginInt } from '../../interfaces/Interfaces';
import { RootState } from '../../redux/store';

import makeStyles from '@mui/styles/makeStyles';
import { newUserIsCreated } from '../../helperFunctions/auth';

import axios from 'axios';

declare module '@mui/styles/defaultTheme' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DefaultTheme extends Theme {}
}

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © ReacType '}
      {new Date().getFullYear()}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  avatar: {
    backgroundColor: 'white'
  },
  form: {
    width: '100%' // Fix IE 11 issue.
  },
  submit: {},
  root: {
    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: 'white'
    }
  }
}));

const SignUp: React.FC<LoginInt & RouteComponentProps> = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVerify, setPasswordVerify] = useState('');
  const [invalidEmailMsg, setInvalidEmailMsg] = useState('');
  const [invalidUsernameMsg, setInvalidUsernameMsg] = useState('');
  const [invalidPasswordMsg, setInvalidPasswordMsg] = useState('');
  const [invalidVerifyPasswordMsg, setInvalidVerifyPasswordMsg] = useState('');
  const [invalidEmail, setInvalidEmail] = useState(false);
  const [invalidUsername, setInvalidUsername] = useState(false);
  const [invalidPassword, setInvalidPassword] = useState(false);
  const [invalidVerifyPassword, setInvalidVerifyPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let inputVal = e.target.value;
    switch (e.target.name) {
      case 'email':
        setEmail(inputVal);
        break;
      case 'username':
        setUsername(inputVal);
        break;
      case 'password':
        setPassword(inputVal);
        break;
      case 'passwordVerify':
        setPasswordVerify(inputVal);
        break;
    }
  };

  const newUserIsCreated = async (username, email, password) => {
    try {
      const response = await axios.post('http://localhost:5656/signup', {
        username,
        email,
        password
      });
      return response.data.message;
    } catch (error) {
      console.error('Signup failed in newUserIsCreated:', error);
      throw new Error('Failed to create user in newUserIsCreated.');
    }
  };

  const setErrorMessages = (type, message) => {
    switch (type) {
      case 'email':
        setInvalidEmail(true);
        setInvalidEmailMsg(message);
        break;
      case 'username':
        setInvalidUsername(true);
        setInvalidUsernameMsg(message);
        break;
      case 'password':
        setInvalidPassword(true);
        setInvalidPasswordMsg(message);
        break;
      case 'verifyPassword':
        setInvalidVerifyPassword(true);
        setInvalidVerifyPasswordMsg(message);
        break;
      default:
        console.log('Unknown error type');
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    // Reset Error Validation
    setInvalidEmailMsg('');
    setInvalidUsernameMsg('');
    setInvalidPasswordMsg('');
    setInvalidVerifyPasswordMsg('');
    setInvalidEmail(false);
    setInvalidUsername(false);
    setInvalidPassword(false);
    setInvalidVerifyPassword(false);

    // Validate input fields and set errors if any
    if (email === '') {
      setErrorMessages('email', 'No Email Entered');
      return;
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
      setErrorMessages('email', 'Invalid Email Format');
      return;
    }

    if (username === '') {
      setErrorMessages('username', 'No Username Entered');
      return;
    } else if (!/^[\w\s-]{4,15}$/i.test(username)) {
      setErrorMessages('username', 'Must Be 4 - 15 Characters Long');
      return;
    } else if (!/^[\w-]+$/i.test(username)) {
      setErrorMessages(
        'username',
        'Cannot Contain Spaces or Special Characters'
      );
      return;
    }

    if (password === '') {
      setErrorMessages('password', 'No Password Entered');
      return;
    } else if (password.length < 8) {
      setErrorMessages('password', 'Minimum 8 Characters');
      return;
    } else if (
      !/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/i.test(
        password
      )
    ) {
      setErrorMessages(
        'password',
        'Minimum 1 Letter, Number, and Special Character'
      );
      return;
    } else if (password !== passwordVerify) {
      setErrorMessages('password', 'Verification Failed');
      setErrorMessages('verifyPassword', 'Verification Failed');
      setPasswordVerify('');
      return;
    }

    // Attempt to create a new user
    try {
      const userCreated = await newUserIsCreated(username, email, password);
      if (userCreated === 'Success') {
        props.history.push('/');
      } else {
        switch (userCreated) {
          case 'Email Taken':
            setErrorMessages('email', 'Email Taken');
            break;
          case 'Username Taken':
            setErrorMessages('username', 'Username Taken');
            break;
          default:
            console.log(
              'Signup failed: Unknown or unhandled error',
              userCreated
            );
          // Optionally set a generic error message for the user
        }
      }
    } catch (error) {
      console.error('Error during signup in handleSignUp:', error);
      // Handle network or server errors (optional: set a generic user-facing error message)
    }
  };

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={SigninDark}>
        <Container
          component="main"
          maxWidth="xs"
          sx={{
            marginTop: '10vh'
          }}
        >
          <CssBaseline />
          <div className={classes.paper}>
            <Avatar className={classes.avatar} sx={{ margin: '2vh' }}>
              <AssignmentIcon />
            </Avatar>
            <Typography
              component="h1"
              variant="h5"
              color="textPrimary"
              sx={{ marginBottom: '2rem' }}
            >
              Sign up
            </Typography>
            <form className={classes.form} noValidate onSubmit={handleSignUp}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    className={classes.root}
                    variant="outlined"
                    required
                    fullWidth
                    id="email"
                    label="Email"
                    name="email"
                    autoComplete="email"
                    value={email}
                    onChange={handleChange}
                    helperText={invalidEmailMsg}
                    error={invalidEmail}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    className={classes.root}
                    variant="outlined"
                    required
                    fullWidth
                    id="username"
                    label="Username"
                    name="username"
                    autoComplete="username"
                    value={username}
                    onChange={handleChange}
                    helperText={invalidUsernameMsg}
                    error={invalidUsername}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    className={classes.root}
                    variant="outlined"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    value={password}
                    onChange={handleChange}
                    helperText={invalidPasswordMsg}
                    error={invalidPassword}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    className={classes.root}
                    variant="outlined"
                    required
                    fullWidth
                    name="passwordVerify"
                    label="Verify Password"
                    type="password"
                    id="passwordVerify"
                    autoComplete="verify-password"
                    value={passwordVerify}
                    onChange={handleChange}
                    helperText={invalidVerifyPasswordMsg}
                    error={invalidVerifyPassword}
                  />
                </Grid>
              </Grid>
              <Typography
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  textAlign: 'center',
                  color: '#aaaaaa',
                  margin: '2rem',
                  padding: '0 4rem 0 0',
                  width: '100%'
                }}
              >
                <span>
                  By signing up, you agree to our
                  <span className="blue-accent-text">
                    {' '}
                    Terms , Privacy Policy
                  </span>{' '}
                  and <span className="blue-accent-text">
                    {' '}
                    Cookies Policy
                  </span>{' '}
                </span>
              </Typography>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                sx={{
                  backgroundColor: '#2997ff',
                  marginBottom: '5px',
                  marginTop: '20px',
                  textTransform: 'none',
                  fontSize: '1rem',
                  '$:hover': {
                    cursor: 'pointer'
                  }
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-person-add"
                  viewBox="0 0 16 16"
                  style={{ marginLeft: '5px' }}
                >
                  <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm.5-5v1h1a.5.5 0 0 1 0 1h-1v1a.5.5 0 0 1-1 0v-1h-1a.5.5 0 0 1 0-1h1v-1a.5.5 0 0 1 1 0Zm-2-6a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM8 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
                  <path d="M8.256 14a4.474 4.474 0 0 1-.229-1.004H3c.001-.246.154-.986.832-1.664C4.484 10.68 5.711 10 8 10c.26 0 .507.009.74.025.226-.341.496-.65.804-.918C9.077 9.038 8.564 9 8 9c-5 0-6 3-6 4s1 1 1 1h5.256Z" />
                </svg>
                Sign Up
              </Button>

              <RouteLink
                style={{ color: '#aaaaaa' }}
                to={`/login`}
                className="nav_link"
              >
                <span>
                  Already have an account?
                  <span className="blue-accent-text"> Log in</span>{' '}
                </span>
              </RouteLink>
            </form>
          </div>
          <Box mt={5}>
            <Copyright />
          </Box>
        </Container>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default withRouter(SignUp);

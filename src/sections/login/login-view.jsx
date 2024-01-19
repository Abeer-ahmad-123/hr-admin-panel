import { useState } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';

import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import { alpha, useTheme } from '@mui/material/styles';
import InputAdornment from '@mui/material/InputAdornment';

import { bgGradient } from 'src/theme/css';

import Logo from 'src/components/logo';
import Iconify from 'src/components/iconify';
import { useDispatch } from 'react-redux';
import { login } from 'src/redux-toolkit/actions/authActions';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';

// ----------------------------------------------------------------------

export default function LoginView() {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const [showPassword, setShowPassword] = useState(false);
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const isEmailValid = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleInputChange = (field) => (e) => {
    if (field === 'email') {
      const emailValue = e.target.value;
      setCredentials({ ...credentials, [field]: emailValue });

      // Check for empty email
      setEmailError(!emailValue);

      // Check for invalid email
      setEmailError((prevError) => prevError || !isEmailValid(emailValue));
    } else if (field === 'password') {
      const passwordValue = e.target.value;
      setCredentials({ ...credentials, [field]: passwordValue });

       // Check for empty password
       setPasswordError(!passwordValue);

       // Check for password length less than 8 characters
       setPasswordError((prevError) => prevError || passwordValue.length < 8);
    }
  };


  const handleLoginClick = async () => {
    if (!credentials.email) {
      setEmailError(true);
    }

    if (!credentials.password) {
      setPasswordError(true);
    }

    if (!isEmailValid(credentials.email)) {
      setEmailError(true);
      return;
    }

    await dispatch(login(credentials))
      .then((response) => {
        console.log("response",response)
        if (response.payload) {
          navigate('/');
        }
       // error.response && error.response.status === 401
      //  else if(response.error.message === "Request failed with status code 401" || response.error.message === "Request failed with status code 400")
      else if(response?.error?.message)  
      {
        console.log(response)
          enqueueSnackbar("Invalid Credentials", {
            variant: 'error',
            anchorOrigin: {
              vertical: 'top',
              horizontal: 'right',
            },
          });
          }
        
      })
      .catch((error) => {
        console.error('Login Failed:', error);
      });
  };


  const getEmailHelperText = () => {
    if (emailError) {
      if (!credentials.email) {
        return 'Email is required';
      } 
      
      if (!isEmailValid(credentials.email)) {
        return 'Invalid email address';
      }
    }
    
    return '';
  };

  const getPasswordHelperText = () => {
    if (passwordError) {
      if (!credentials.password) {
        return 'Password is required';
      }

      if (credentials.password.length < 8) {
        return 'Password must be at least 8 characters';
      }
    }
    
    return '';
  };

  const renderForm = (
    <>
      <Stack spacing={3}>
        <TextField
          name="email"
          label="Email address"
          value={credentials.email}
          onChange={handleInputChange('email')}
          error={emailError}
          helperText={getEmailHelperText()}
      />

        <TextField
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          value={credentials.password}
          onChange={handleInputChange('password')}
          error={passwordError}
          helperText={getPasswordHelperText()}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="flex-end" sx={{ my: 3 }}>
        {/* <Link variant="subtitle2" underline="hover">
          Forgot password?
        </Link> */}
      </Stack>

      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        color="inherit"
        onClick={handleLoginClick}
        disabled={!credentials.email || !credentials.password || emailError || passwordError}
      >
        Login
      </LoadingButton>
    </>
  );

  return (
    <Box
      sx={{
        ...bgGradient({
          color: alpha(theme.palette.background.default, 0.9),
          imgUrl: '/assets/background/overlay_4.jpg',
        }),
        height: 1,
      }}
    >
      <Logo
        sx={{
          position: 'fixed',
          top: { xs: 16, md: 24 },
          left: { xs: 16, md: 24 },
        }}
      />

      <Stack alignItems="center" justifyContent="center" sx={{ height: 1 }}>
        <Card
          sx={{
            p: 5,
            width: 1,
            maxWidth: 420,
          }}
        >
          <Typography
            variant="h4"
            sx={{ mt: 2, mb: 5, textAlign: 'center' }}
          >
            Sign in
          </Typography>

          {renderForm}
        </Card>
      </Stack>
    </Box>
  );
}

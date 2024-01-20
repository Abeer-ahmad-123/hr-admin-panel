import * as React from 'react';
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
import { loginFn } from 'src/redux-toolkit/actions/loginActions';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';

export default function LoginView() {
  const dispatch = useDispatch();
  const theme = useTheme();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const [showPassword, setShowPassword] = useState(false);

  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [emailValidator, setEmailValidator] = useState({
    error: false,
    helperText: '',
  });
  const [passwordValidator, setPasswordValidator] = useState({
    error: false,
    helperText: '',
  });

  const handleClick = async () => {
    await dispatch(loginFn({ email: credentials.email, password: credentials.password }))
      .then((response) => {
        if (response.payload) {
          navigate('/');
        } else {
          enqueueSnackbar(response?.error?.message && ' Invalid Cresidentials', {
            variant: 'error',
            anchorOrigin: {
              vertical: 'top',
              horizontal: 'right',
            },
          });
        }
      })
      .catch((err) => {
        throw err;
      });
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleChange = (feild) => (e) => {
    //      email validator      //

    if (credentials.email === '') {
      setEmailValidator({
        error: true,
        helperText: 'Email required',
      });

      return setCredentials({ ...credentials, [feild]: e.target.value });
    }
    // eslint-disable-next-line no-else-return
    else if (!validateEmail(credentials.email)) {
      setEmailValidator({
        error: true,
        helperText: 'Invalid email format',
      });
      return setCredentials({ ...credentials, [feild]: e.target.value });
    }
    // eslint-disable-next-line no-else-return
    else {
      setEmailValidator({
        error: false,
        helperText: '',
      });
      setCredentials({ ...credentials, [feild]: e.target.value });
    }

    //      password validator      //
    if (feild === 'password' && e.target.value.length < 8) {
      setPasswordValidator({
        error: true,
        helperText: 'Password should be at least 8 characters long',
      });
      return setCredentials({ ...credentials, [feild]: e.target.value });
    }
    // eslint-disable-next-line no-else-return
    else {
      setPasswordValidator({
        error: false,
        helperText: '',
      });
      setCredentials({ ...credentials, [feild]: e.target.value });
    }

    if (feild === 'email') {
      setEmailValidator({
        error: false,
        helperText: '',
      });
    }
    if (feild === 'password') {
      setPasswordValidator({
        error: false,
        helperText: '',
      });
    }
    return setCredentials({ ...credentials, [feild]: e.target.value });
  };

  const renderForm = (
    <>
      {' '}
      <Typography
        sx={{
          display: 'flex',
          justifyContent: 'center',
        }}
        variant="h4"
      >
        Sign In
      </Typography>
      <Stack spacing={3} sx={{ my: 10 }}>
        <TextField
          name="email"
          label="Email address"
          onChange={handleChange('email')}
          value={credentials.email}
          error={emailValidator.error}
          helperText={emailValidator.helperText}
        />

        <TextField
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          onChange={handleChange('password')}
          value={credentials.password}
          error={passwordValidator.error}
          helperText={passwordValidator.helperText}
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
      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        onClick={handleClick}
        disabled={
          !credentials.email ||
          !credentials.password ||
          passwordValidator.error ||
          emailValidator.error
        }
      >
        Sign In
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
            position: 'relative',
            transition: 'filter 0.3s ease',
            '&:focus': {
              filter: 'drop-shadow(0px 10px 20px rgba(81, 65, 223, 0.4))',
            },
            '&:focus:after': {
              content: '""',
              position: 'absolute',
              top: '-8px',
              right: '-8px',
              bottom: '-8px',
              left: '-8px',
              border: '2px solid #513FDF',
              borderRadius: '8px',
              pointerEvents: 'none',
            },
          }}
          tabIndex={0}
        >
          {renderForm}
        </Card>
      </Stack>
    </Box>
  );
}

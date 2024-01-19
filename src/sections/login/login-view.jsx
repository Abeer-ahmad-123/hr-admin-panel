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

  const isEmailValid = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleInputChange = (field) => (e) => {
    if (field === 'email') {
      const isValid = isEmailValid(e.target.value);
      setEmailError(!isValid);
    }

    setCredentials({ ...credentials, [field]: e.target.value });
  };

  const handleLoginClick = () => {
    if (!isEmailValid(credentials.email)) {
      setEmailError(true);
      return;
    }

    dispatch(login(credentials))
      .then((response) => {
        if (response.payload) {
          navigate('/');
        }
        else {
          enqueueSnackbar(response?.error?.message, {
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

  const renderForm = (
    <>
      <Stack spacing={3}>
        <TextField
          name="email"
          label="Email address"
          value={credentials.email}
          onChange={handleInputChange('email')}
          error={emailError}
          helperText={emailError && 'Invalid email address'}
        />

        <TextField
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          value={credentials.password}
          onChange={handleInputChange('password')}
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

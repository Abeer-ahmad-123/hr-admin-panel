import { useState } from 'react';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import { alpha, useTheme } from '@mui/material/styles';
import InputAdornment from '@mui/material/InputAdornment';
import { useRouter } from 'src/routes/hooks';
import { bgGradient } from 'src/theme/css';
import Logo from 'src/components/logo';
import Iconify from 'src/components/iconify';
import { useDispatch } from 'react-redux';
import { loginFn } from 'src/Redux-toolkit/actions/loginActions';

// ----------------------------------------------------------------------

export default function LoginView() {
  const dispatch = useDispatch();
  const theme = useTheme();

  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);

  const [inputEmail, setInputEmail] = useState('');
  const [inputPassword, setInputPassword] = useState('');

  const handleClick = () => {
    router.push('/');
    const res = dispatch(loginFn({ email: inputEmail, password: inputPassword }));
    console.log('after sending the data we have', res);
  };
  console.log('the get token is', localStorage.getItem('access-token'));
  const handleEmailChange = (e) => {
    setInputEmail(e);
    console.log('user enter the value', inputEmail);
  };
  const handlePasswordChange = (e) => {
    setInputPassword(e);
    console.log('user enter the value', inputPassword);
  };
  // const handleConfirmPasswordChange = (e) => {
  //   setConfirmInputPassword(e);
  //   console.log('user enter the value', inputConfirmPassword);
  // };

  const renderForm = (
    <>
      <Stack spacing={3}>
        <Typography
          sx={{
            display: 'flex',
            justifyContent: 'center',
          }}
          variant="h4"
        >
          Sign in
        </Typography>
        <TextField
          name="email"
          label="Email address"
          onChange={(e) => handleEmailChange(e.target.value)}
          value={inputEmail}
        />

        <TextField
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          onChange={(e) => handlePasswordChange(e.target.value)}
          value={inputPassword}
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
        {/* <TextField
          name="confirm password"
          label="Confirm Password"
          onChange={(e) => handleConfirmPasswordChange(e.target.value)}
          value={inputConfirmPassword}
        /> */}
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="flex-end" sx={{ my: 3 }}>
        <Link variant="subtitle2" underline="hover">
          Forgot password?
        </Link>
      </Stack>

      <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={handleClick}>
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
            filter: 'drop-shadow(0px 10px 20px rgba(81, 65, 223, 0.4))',
          }}
        >
          {/* <Typography variant="body2" sx={{ mt: 2, mb: 5 }}>
            Don’t have an account?
            <Link variant="subtitle2" sx={{ ml: 0.5 }}>
              Get started
            </Link>
          </Typography> */}

          {renderForm}
        </Card>
      </Stack>
    </Box>
  );
}

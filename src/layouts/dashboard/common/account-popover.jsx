import { useState, useEffect } from 'react';
import { useSnackbar } from 'notistack';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import Popover from '@mui/material/Popover';
import { alpha } from '@mui/material/styles';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { useNavigate } from 'react-router-dom';
import { account } from 'src/_mock/account';
import { useDispatch, useSelector } from 'react-redux';
import { clearAuth } from 'src/redux-toolkit/reducers/loginReducer';
import UpdateModel from '../UpdateModel';

export default function AccountPopover() {
  const [clicked, setClicked] = useState(false);
  const [updatePasswordResponse, setupdatePasswordResponse] = useState(null);
  const [updatePasswordError, setupdatePasswordError] = useState('');

  const userData = useSelector((state) => state.auth.admindata);
  const { updatePassword } = useSelector((state) => state?.UpdatePassword);
  const [open, setOpen] = useState(null);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };
  const { enqueueSnackbar } = useSnackbar();

  const handleClose = () => {
    setOpen(null);
  };

  const openUpdateModal = () => {
    setClicked(!clicked);
  };
  const handleLogout = () => {
    dispatch(clearAuth());
    navigate('/login');
  };

  useEffect(() => {
    if (updatePassword) {
      if (updatePassword?.response?.data?.errors) {
        setupdatePasswordResponse(updatePassword?.response?.data?.errors[0]);
      } else {
        setupdatePasswordResponse(updatePassword?.message);
      }
    }
    if (updatePassword?.response?.data) {
      setupdatePasswordError(updatePassword?.response?.data?.errors[1]);
    }
  }, [updatePassword]);

  useEffect(() => {
    if (updatePasswordResponse)
      enqueueSnackbar(`${updatePasswordResponse}`, {
        variant: updatePassword?.response?.status === 400 ? 'error' : 'success',
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'right',
        },
      });
    // eslint-disable-next-line
  }, [updatePasswordResponse]);
  useEffect(() => {
    if (updatePasswordError)
      enqueueSnackbar(`${updatePasswordError}`, {
        variant: 'error',
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'right',
        },
      });
    // eslint-disable-next-line
  }, [updatePasswordError]);

  return (
    <>
      <IconButton
        onClick={handleOpen}
        sx={{
          width: 40,
          height: 40,
          background: (theme) => alpha(theme.palette.grey[500], 0.08),
          ...(open && {
            background: (theme) =>
              `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`,
          }),
        }}
      >
        <Avatar
          src={account.photoURL}
          alt={account.displayName}
          sx={{
            width: 36,
            height: 36,
            border: (theme) => `solid 2px ${theme.palette.background.default}`,
          }}
        >
          {userData?.name}
        </Avatar>
      </IconButton>

      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 0,
            mt: 1,
            ml: 0.75,
            width: 200,
          },
        }}
      >
        <Box sx={{ my: 1.5, px: 2 }}>
          <Typography variant="subtitle2" noWrap>
            {userData?.name}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            {userData?.email}
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <MenuItem
          disableRipple
          disableTouchRipple
          onClick={openUpdateModal}
          sx={{ typography: 'body2', color: 'primary.main', py: 1.5 }}
        >
          Change Passwrord
        </MenuItem>
        <MenuItem
          disableRipple
          disableTouchRipple
          onClick={handleLogout}
          sx={{ typography: 'body2', color: 'primary.main', py: 1.5 }}
        >
          Logout
        </MenuItem>
        <UpdateModel clicked={clicked} setClicked={setClicked} />
      </Popover>
    </>
  );
}

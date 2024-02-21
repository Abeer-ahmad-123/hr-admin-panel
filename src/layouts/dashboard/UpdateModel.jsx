import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useDispatch, useSelector } from 'react-redux';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Iconify from 'src/components/iconify';
import Modal from '@mui/material/Modal';
import InputAdornment from '@mui/material/InputAdornment';
import { useAuth } from 'src/hooks/interceptors';
import { UpdatePassword } from 'src/redux-toolkit/actions/UpdatePassword';
import { style } from 'src/components/DeleteModel/DeleteModel';
import {
  TextFieldStyle,
  formStyle,
  submitButton,
  deleteButton,
  title,
} from 'src/components/Constants';

const UpdateModel = ({ clicked, setClicked }) => {
  const [open, setOpen] = useState(clicked);
  const [passwordData, setPasswordData] = useState({
    newPassword: '',
    oldPassword: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [newPasswordVisible, setNewPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const { setupApiInterceptor } = useAuth();
  const dispatch = useDispatch();
  const authToken = useSelector((state) => state.auth?.accessToken);

  const handleClose = () => {
    setOpen(!clicked);
    if (clicked === true) {
      setClicked(false);
    }
  };

  const updatePassword = () => {
    dispatch(
      UpdatePassword({
        setupApiInterceptor,
        authToken,
        newPassword: passwordData.newPassword,
        oldPassword: passwordData.oldPassword,
      })
    );

    handleClose();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPasswordData({ ...passwordData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updatePassword();
    handleClose();
  };
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleNewPassword = () => {
    setNewPasswordVisible(!newPasswordVisible);
  };
  const handleConfirmPassword = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  useEffect(() => {
    setOpen(clicked);
  }, [clicked]);

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{ ...style }}>
          <Stack direction="row" justifyContent="center" alignItems="center" sx={title}>
            <Typography id="modal-modal-title" variant="h6">
              Change the Password
            </Typography>
          </Stack>
          <form onSubmit={handleSubmit} style={formStyle}>
            <TextField
              key="old"
              label="Old Password"
              name="oldPassword"
              type={showPassword ? 'text' : 'password'}
              value={passwordData.oldPassword}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
              sx={TextFieldStyle}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleShowPassword} edge="end">
                      <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              key="new"
              label="New Password"
              name="newPassword"
              type={newPasswordVisible ? 'text' : 'password'}
              value={passwordData.newPassword}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
              sx={TextFieldStyle}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleNewPassword} edge="end">
                      <Iconify icon={newPasswordVisible ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              key="confirm"
              label="Confirm Password"
              name="confirmPassword"
              type={confirmPasswordVisible ? 'text' : 'password'}
              value={passwordData.confirmPassword}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
              sx={TextFieldStyle}
              helperText={
                passwordData.newPassword !== passwordData.confirmPassword &&
                'the password is not matching'
              }
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleConfirmPassword} edge="end">
                      <Iconify
                        icon={confirmPasswordVisible ? 'eva:eye-fill' : 'eva:eye-off-fill'}
                      />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </form>
          <Stack direction="row" justifyContent="space-around">
            <Button type="submit" onClick={handleClose} sx={deleteButton}>
              Cancel
            </Button>
            <Button
              type="submit"
              onClick={handleSubmit}
              sx={submitButton}
              disabled={
                passwordData.oldPassword === '' ||
                passwordData.newPassword === '' ||
                passwordData.newPassword !== passwordData.confirmPassword
              }
            >
              Submit
            </Button>
          </Stack>
        </Box>
      </Modal>
    </div>
  );
};

export default UpdateModel;

UpdateModel.propTypes = {
  clicked: PropTypes.bool,
  setClicked: PropTypes.func,
};

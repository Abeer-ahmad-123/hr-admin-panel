import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useDispatch, useSelector } from 'react-redux';
// import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
// import Iconify from 'src/components/iconify';
import Modal from '@mui/material/Modal';
// import InputAdornment from '@mui/material/InputAdornment';
import { useAuth } from 'src/hooks/interceptors';
// import { delchannelPost } from 'src/redux-toolkit/actions/channelAction';
import { UpdatePassword } from 'src/redux-toolkit/actions/UpdatePassword';
import { style } from 'src/components/DeleteModel/DeleteModel';

const UpdateModel = ({ clicked, setClicked }) => {
  const [open, setOpen] = useState(clicked);
  const [passwordData, setPasswordData] = useState({
    newPassword: '',
    oldPassword: '',
    confirmPassword: '',
  });
  //   const [showPassword, setShowPassword] = useState(false);

  const { setupApiInterceptor } = useAuth();
  const dispatch = useDispatch();
  const authToken = useSelector((State) => State.auth?.accessToken);

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

  useEffect(() => {
    setOpen(clicked);
  }, [clicked]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPasswordData({ ...passwordData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updatePassword();
    handleClose();
  };

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
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Update the Password
            </Typography>
          </Stack>
          <form onSubmit={handleSubmit} style={formStyle}>
            <TextField
              label="Old Password"
              name="oldPassword"
              value={passwordData.oldPassword}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
              sx={TextFieldStyle}
            />
            <TextField
              label="New Password"
              name="newPassword"
              //   type={showPassword ? 'text' : 'password'}
              value={passwordData.newPassword}
              onChange={handleInputChange}
              fullWidth
              multiline
              margin="normal"
              sx={TextFieldStyle}
            />
            <TextField
              label="Confirm Password"
              name="confirmPassword"
              //   type={showPassword ? 'text' : 'password'}
              value={passwordData.confirmPassword}
              onChange={handleInputChange}
              fullWidth
              multiline
              margin="normal"
              sx={TextFieldStyle}
              helperText={
                passwordData.newPassword !== passwordData.confirmPassword &&
                'the password is not matching'
              }
            />
          </form>
          <Stack direction="row" justifyContent="space-around">
            <Button
              type="submit"
              onClick={handleClose}
              sx={deleteButton}
              // disabled={!channelData.name && !channelData.description}
            >
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

const TextFieldStyle = {
  borderRadius: '10px',
  backgroundColor: 'white',
  border: 'none',
};
const formStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '2rem',
};
const submitButton = {
  backgroundColor: '#571CE0',
  color: 'white',
  boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
  '&:hover': {
    backgroundColor: '#571CE0',
    boxShadow: '0px 10px 14px rgba(0, 0, 0, 0.2)',
  },
  '&:disabled': {
    backgroundColor: 'gray',
    color: 'white',
  },
};

const deleteButton = {
  backgroundColor: 'red',
  color: 'white',
  boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
  '&:hover': {
    backgroundColor: 'gray',
    boxShadow: '0px 10px 14px rgba(0, 0, 0, 0.2)',
  },
  '&:disabled': {
    backgroundColor: 'gray',
    color: 'white',
  },
};
const title = {
  border: '1px solid #571CE0',

  height: '3rem',
  borderRadius: '5px',
  boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
};

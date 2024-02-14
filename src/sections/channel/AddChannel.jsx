import PropTypes from 'prop-types';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useAuth } from 'src/hooks/interceptors';
import { createChannel } from 'src/redux-toolkit/actions/channelAction';

const style = {
  display: 'flex',
  flexDirection: 'column',
  gap: '4rem',
  position: 'absolute',
  top: '50%',
  left: '50%',
  borderRadius: '10px',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: 'none',
  boxShadow: 50,
  p: 4,
};

const AddChannel = ({ clicked, setClicked }) => {
  const [open, setOpen] = React.useState(clicked);
  const [channelData, setChannelData] = useState({
    name: '',
    description: '',
    image: null,
  });

  const dispatch = useDispatch();
  const { setupApiInterceptor } = useAuth();
  const authToken = useSelector((state) => state.auth?.accessToken);

  const handleClose = () => {
    setOpen(false);
    if (clicked === true) {
      setClicked(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setChannelData({ ...channelData, [name]: value });
  };

  const handleImageChange = (e) => {
    setChannelData({ ...channelData, image: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(createChannel({ setupApiInterceptor, authToken, channelData }));

    handleClose();
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
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Add Channel
            </Typography>
          </Stack>
          <form style={formStyle}>
            <TextField
              label="Channel Name"
              name="name"
              value={channelData.name}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
              sx={TextFieldStyle}
            />
            <TextField
              label="Description"
              name="description"
              value={channelData.description}
              onChange={handleInputChange}
              fullWidth
              multiline
              margin="normal"
              sx={TextFieldStyle}
            />
            <input type="file" onChange={handleImageChange} />
          </form>
          <Stack direction="row" justifyContent="space-around">
            <Button onClick={handleClose} sx={deleteButton}>
              Cancel
            </Button>
            <Button
              type="submit"
              onClick={handleSubmit}
              sx={submitButton}
              disabled={!channelData.name && !channelData.description}
            >
              Submit
            </Button>
          </Stack>
        </Box>
      </Modal>
    </div>
  );
};
export default AddChannel;

// ======= Styling =======

AddChannel.propTypes = {
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
};
const title = {
  border: '1px solid #571CE0',

  height: '3rem',
  borderRadius: '5px',
  boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
};

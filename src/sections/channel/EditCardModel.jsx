import * as React from 'react';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useDispatch, useSelector } from 'react-redux';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useAuth } from 'src/hooks/interceptors';
import { editChannel } from 'src/redux-toolkit/actions/channelAction';

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

export default function EditCardModal({ edited, setEdited, channel_id }) {
  const [open, setOpen] = useState(edited);

  const { channels } = useSelector((state) => state.channels?.channels);
  const [channelData, setChannelData] = useState({
    name: '',
    description: '',
    image: null,
  });

  const dispatch = useDispatch();
  const { setupApiInterceptor } = useAuth();
  const authToken = useSelector((state) => state.auth?.accessToken);

  const handleClose = () => {
    setOpen(!edited);
    if (edited === true) {
      setEdited(false);
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
    dispatch(editChannel({ setupApiInterceptor, authToken, channelData, channel_id }));
    handleClose();
  };

  const SpecificChannel = channels.find((chnData) => chnData.id === channel_id);
  useEffect(() => {
    setOpen(edited);

    setChannelData({
      name: SpecificChannel.name,
      description: SpecificChannel.description,
      img: null,
    });
  }, [SpecificChannel, edited]);

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
              {` Edit ${SpecificChannel.name}`}
            </Typography>
          </Stack>
          <form onSubmit={handleSubmit} style={formStyle}>
            <TextField
              label="Name"
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
            <Button
              type="submit"
              onClick={handleClose}
              sx={deleteButton}
              disabled={!channelData.name && !channelData.description}
            >
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
}

EditCardModal.propTypes = {
  edited: PropTypes.bool,
  setEdited: PropTypes.func,
  channel_id: PropTypes.number,
};

// ======= Styling =======

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

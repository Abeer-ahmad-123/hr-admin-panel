import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useDispatch, useSelector } from 'react-redux';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useAuth } from 'src/hooks/interceptors';
import { delChannel } from 'src/redux-toolkit/actions/channelAction';
import { style, yesButton, noButton } from 'src/components/DeleteModel/DeleteModel';

const DeleteCardModel = ({ clicked, setClicked, channel_id = '' }) => {
  const [open, setOpen] = useState(clicked);

  const { setupApiInterceptor } = useAuth();
  const dispatch = useDispatch();
  const authToken = useSelector((State) => State.auth?.accessToken);

  const handleClose = () => {
    setOpen(!clicked);
    if (clicked === true) {
      setClicked(false);
    }
  };

  const deleteChannel = () => {
    dispatch(delChannel({ authToken, setupApiInterceptor, channel_id }));
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
        <Box sx={style}>
          <Stack direction="row" justifyContent="center">
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Do you want to delete this!
            </Typography>
          </Stack>

          <Stack
            direction="row"
            justifyContent="space-around"
            sx={{
              paddingTop: '2rem',
            }}
          >
            <Button onClick={deleteChannel} sx={yesButton}>
              Yes
            </Button>
            <Button onClick={handleClose} sx={noButton}>
              No
            </Button>
          </Stack>
        </Box>
      </Modal>
    </div>
  );
};

export default DeleteCardModel;

DeleteCardModel.propTypes = {
  clicked: PropTypes.bool,
  setClicked: PropTypes.func,
  channel_id: PropTypes.number,
};

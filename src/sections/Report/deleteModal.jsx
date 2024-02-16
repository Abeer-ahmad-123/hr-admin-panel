import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { style, yesButton, noButton } from 'src/components/DeleteModel/DeleteModel';

const DeleteModal = ({ clicked, setClicked, delData, setDelData }) => {
  const [open, setOpen] = useState(clicked || false);

  // const response = useSelector((state)=> state.channel)

  useEffect(() => {
    setOpen(clicked);
  }, [clicked]);

  const handleClose = () => {
    setOpen(!clicked);
    setClicked(false);
  };
  const deleteChannelPost = () => {
    setDelData(!delData);
    handleClose();
  };

  return (
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
          <Button onClick={deleteChannelPost} sx={yesButton}>
            Yes
          </Button>
          <Button onClick={handleClose} sx={noButton}>
            No
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
};

export default DeleteModal;

DeleteModal.propTypes = {
  clicked: PropTypes.bool,
  setClicked: PropTypes.func,
  setDelData: PropTypes.func,
  delData: PropTypes.bool,
};

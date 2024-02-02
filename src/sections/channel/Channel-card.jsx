import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Iconify from 'src/components/iconify';
import { Typography } from '@mui/material';
import CardButton from './CardButton';
import { showErrorAlert } from '../../utils/helper/toast';
import EditCardModal from './EditCardModel';
import DeleteCardModel from './DeleteCardModel';

const ChannelCard = ({ channel }) => {
  const [clicked, setClicked] = useState(false);
  const [edited, setEdited] = useState(false);

  const navigate = useNavigate();

  const handleButtonClick = () => {
    setEdited(!edited);
  };
  const openDeleteModal = () => {
    setClicked(!clicked);
  };

  const handleCardClick = () => {
    try {
      navigate(`/channels/${channel?.id}`);
    } catch (error) {
      showErrorAlert(error);
    }
  };

  return (
    <>
      <Card
        key={channel?.id}
        sx={{
          cursor: 'pointer',
        }}
      >
        <Box sx={{ pt: '100%', position: 'relative' }}>
          <Stack
            id="1"
            sx={{
              position: 'absolute',
              top: '10px',
              right: '10px',
              zIndex: '2',
              backgroundColor: '#db0f24',
              width: '2rem',
              height: '2rem',
              '&:hover': {
                boxShadow: '0px 0px 10px 5px rgba(255, 0, 0, 0.8)',
              },
            }}
            direction="row"
            alignItems="center"
            justifyContent="center"
            borderRadius="30px"
            onClick={openDeleteModal}
          >
            <Iconify
              id="1"
              icon="material-symbols:delete"
              sx={{
                color: 'white',
                '&:hover': {
                  width: '1.4rem',
                  height: '1.4rem',
                },
              }}
            />
          </Stack>
          <img
            src={channel?.ImageURL}
            alt="b_pic"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              position: 'absolute',
              top: 0,
              left: 0,
            }}
          />
        </Box>
        <Stack spacing={2} sx={{ p: 3 }}>
          <Typography color="inherit" sx={cardTitle}>
            {channel?.name}
          </Typography>
          {/* CardButton components */}

          <Stack direction="row" justifyContent="space-between">
            <Stack onClick={handleCardClick}>
              <CardButton icon="ph:eye" label="View Posts" bgcolor="#571CE0" />
            </Stack>

            <Stack onClick={handleButtonClick}>
              <CardButton icon="material-symbols:edit-rounded" label="Edit" bgcolor="#571CE0" />
            </Stack>
          </Stack>
        </Stack>
      </Card>
      <EditCardModal edited={edited} setEdited={setEdited} channel_id={channel?.id} />
      <DeleteCardModel clicked={clicked} setClicked={setClicked} channel_id={channel?.id} />
    </>
  );
};

ChannelCard.propTypes = {
  channel: PropTypes.object,
};

const cardTitle = {
  display: 'flex',
  justifyContent: 'center',
  fontSize: '1.5rem',
  fontWeight: '700',
};

export default ChannelCard;

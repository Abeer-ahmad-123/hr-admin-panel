import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import { Typography } from '@mui/material';
import CardButton from './CardButton';
import { showErrorAlert } from '../../utils/helper/toast';
import DeleteEditModal from './DeleteEditModel';

const ChannelCard = ({ channel }) => {
  const [clicked, setClicked] = useState(false);
  const [selectedId, setSelectedId] = useState('1');
  const navigate = useNavigate();

  const handleButtonClick = (id) => {
    setSelectedId(id);
    setClicked(!clicked);
  };

  const handleCardClick = () => {
    try {
      navigate(`/channels/${channel?.id}`); // Navigate to channel detail page with channel ID
    } catch (error) {
      showErrorAlert(error);
    }
  };

  return (
    <>
      <DeleteEditModal
        clicked={clicked}
        id={selectedId}
        setClicked={setClicked}
        channel_id={channel?.id}
      />
      {/* DeleteEditModal component */}
      <Card
        key={channel?.id}
        sx={{
          cursor: 'pointer',
        }}
      >
        {/* Card content */}
        <Box sx={{ pt: '100%', position: 'relative' }}>
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
          <Stack>
            <CardButton label="View Posts" bgcolor="red" onClick={handleCardClick} />
          </Stack>
          <Stack direction="row" justifyContent="space-between">
            <Stack direction="row" alignItems="center">
              <CardButton
                icon="material-symbols:delete"
                label="Delete"
                bgcolor="red"
                onClick={() => handleButtonClick('1')}
              />
            </Stack>
            <Stack direction="row" alignItems="center">
              <CardButton
                icon="material-symbols:edit-rounded"
                label="Edit"
                bgcolor="#571CE0"
                onClick={() => handleButtonClick('2')}
              />
            </Stack>
          </Stack>
          {/* Additional content */}
          <Stack direction="row" alignItems="center" justifyContent="space-between" />
        </Stack>
      </Card>
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

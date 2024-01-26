import PropTypes from 'prop-types';
import React, { useState } from 'react';

import Box from '@mui/material/Box';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import DeleteEditModal from './DeleteEditModel';
import CardButton from './CardButton';

const ChannelCard = ({ channel }) => {
  const [clicked, setClicked] = useState(false);
  const [selectedId, setSelectedId] = useState('1');

  const handleButtonClick = (id) => {
    setSelectedId(id);

    setClicked(!clicked);
  };

  return (
    <>
      {' '}
      <DeleteEditModal
        clicked={clicked}
        id={selectedId}
        setClicked={setClicked}
        channel_id={channel?.id}
      />
      <Card
        key={channel?.id}
        sx={{
          cursor: 'pointer',
        }}
      >
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
          <Stack direction="row" justifyContent="space-between">
            <CardButton label="delete" bgcolor="red" onClick={() => handleButtonClick('1')} />
            <CardButton label="edit" bgcolor="#571CE0" onClick={() => handleButtonClick('2')} />
          </Stack>
          <Stack direction="row" alignItems="center" justifyContent="space-between" />
        </Stack>
      </Card>
    </>
  );
};
export default ChannelCard;
ChannelCard.propTypes = {
  channel: PropTypes.object,
};

const cardTitle = {
  display: 'flex',
  justifyContent: 'center',
  fontSize: '1.5rem',
  fontWeight: '700',
};

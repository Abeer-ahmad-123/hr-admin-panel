import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Iconify from 'src/components/iconify';
import React from 'react';

const CardButton = ({ icon, label, bgcolor, onClick, H, W }) => (
  <Stack
    direction="row"
    alignItems="center"
    justifyContent="center"
    sx={{
      backgroundColor: bgcolor,
      color: 'white',
      width: W,
      height: H,
      borderRadius: '10px',
      transition: 'width 100ms ease, height 100ms ease',
      '&:hover': {
        backgroundColor: `rgba(${bgcolor}, 0.8)`,
        filter: 'drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))',
      },
    }}
  >
    <Iconify
      icon={icon}
      sx={{
        marginLeft: '10px',
      }}
    />
    <Button
      onClick={onClick}
      sx={{
        color: 'white',
        '&:hover': {
          pointerEvents: 'none',
        },
      }}
    >
      <Stack direction="row" justifyContent="center">
        {label}
      </Stack>
    </Button>
  </Stack>
);

export default CardButton;

CardButton.propTypes = {
  label: PropTypes.string,
  bgcolor: PropTypes.string,
  onClick: PropTypes.func,
  icon: PropTypes.string,
  H: PropTypes.string,
  W: PropTypes.string,
};

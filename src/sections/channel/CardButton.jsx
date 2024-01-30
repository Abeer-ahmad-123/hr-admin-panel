import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Iconify from 'src/components/iconify';
import React from 'react';

const CardButton = ({ icon, label, bgcolor, onClick }) => (
  <Stack
    direction="row"
    justifyContent="space-evenly"
    alignItems="center"
    sx={{
      backgroundColor: bgcolor,
      color: 'white',
      width: '6rem',
      height: '2.5rem',
      borderRadius: '10px',
      transition: 'width 100ms ease, height 100ms ease',
      '&:hover': {
        backgroundColor: bgcolor,
        filter: 'drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))',
        width: '6.1rem',
        height: '2.6rem',
      },
    }}
  >
    <Iconify icon={icon} />
    <Button
      onClick={onClick}
      sx={{
        backgroundColor: bgcolor,
        color: 'white',
      }}
    >
      <Stack direction="row" alignItems="baseline">
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
  icon: PropTypes.any,
};

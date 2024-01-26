import PropTypes from 'prop-types';
import Button from '@mui/material/Button';

import React from 'react';

const CardButton = ({ label, bgcolor, onClick }) => (
  <div>
    <Button
      onClick={onClick}
      sx={{
        backgroundColor: bgcolor,
        color: 'white',
        width: '4.2rem',
        height: '2.2rem',
        transition: 'width 100ms ease, height 100ms ease',
        '&:hover': {
          backgroundColor: bgcolor,
          filter: 'drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))',
          width: '4.3rem',
          height: '2.3rem',
        },
      }}
    >
      {label}
    </Button>
  </div>
);

export default CardButton;

CardButton.propTypes = {
  label: PropTypes.string,
  bgcolor: PropTypes.string,
  onClick: PropTypes.func,
};

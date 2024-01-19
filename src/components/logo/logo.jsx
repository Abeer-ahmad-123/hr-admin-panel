import PropTypes from 'prop-types';
import { forwardRef } from 'react';
import { GiCheckedShield } from 'react-icons/gi';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import { RouterLink } from 'src/routes/components';

const Logo = forwardRef(({ disabledLink = false, sx, ...other }, ref) => {
  const logo = (
    <Box
      ref={ref}
      component="div"
      sx={{
        display: 'inline-flex',
        alignItems: 'center',

        ...sx,
      }}
    >
      <GiCheckedShield size={50} fill="#5141df" />
      <span
        style={{
          fontSize: '1.3rem',
          color: 'black',
          fontWeight: '600',
        }}
      >
        HR FORUM
      </span>
    </Box>
  );

  if (disabledLink) {
    return logo;
  }

  return (
    <Link component={RouterLink} href="/" sx={{ display: 'contents' }}>
      {logo}
    </Link>
  );
});

Logo.propTypes = {
  disabledLink: PropTypes.bool,
  sx: PropTypes.object,
};

export default Logo;

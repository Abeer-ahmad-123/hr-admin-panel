import React, { useState, forwardRef } from 'react';
import Stack from '@mui/material/Stack';
import PropTypes from 'prop-types';
import Popover from '@mui/material/Popover';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import TableCell from '@mui/material/TableCell';

import IconButton from '@mui/material/IconButton';
import Iconify from 'src/components/iconify';

const ChannelsTableRow = forwardRef(
  ({ id, title, description, image, comments, reactions, selected, onPostClick }, ref) => {
    const [open, setOpen] = useState(null);

    const handleOpenMenu = (event) => {
      setOpen(event.currentTarget);
    };

    const handleCloseMenu = () => {
      setOpen(null);
    };

    return (
      <>
        <TableRow key={id} hover tabIndex={-1} ref={ref} role="checkbox" selected={selected}>
          <TableCell padding="checkbox">
            <Checkbox disableRipple checked={selected} />
          </TableCell>

          <TableCell component="th" scope="row" padding="none">
            <Stack direction="row" alignItems="center" spacing={2} />
          </TableCell>

          <TableCell>{title}</TableCell>

          <TableCell>{description}</TableCell>
          <TableCell>
            {image && <img src={image} alt="no-pic" height="60vh" width="80vw" />}
          </TableCell>
          <TableCell>{comments}</TableCell>
          <TableCell>{reactions}</TableCell>

          <TableCell align="right">
            <IconButton onClick={handleOpenMenu}>
              <Iconify icon="eva:more-vertical-fill" />
            </IconButton>
          </TableCell>
        </TableRow>

        <Popover
          open={!!open}
          anchorEl={open}
          onClose={handleCloseMenu}
          anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <MenuItem id={id} onClick={onPostClick}>
            <Iconify icon="eva:eye-outline" sx={{ mr: 2 }} /> {/* Use the "View" icon */}
            View
          </MenuItem>

          <MenuItem onClick={handleCloseMenu} sx={{ color: 'error.main' }}>
            <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
            Delete
          </MenuItem>
        </Popover>
      </>
    );
  }
);

ChannelsTableRow.propTypes = {
  id: PropTypes.number,
  selected: PropTypes.bool,
  title: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.any,
  comments: PropTypes.func,
  reactions: PropTypes.any,
  onPostClick: PropTypes.func,
};

export default ChannelsTableRow;

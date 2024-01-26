import React, { useState, forwardRef } from 'react';
import Stack from '@mui/material/Stack';
import PropTypes from 'prop-types';
import Avatar from '@mui/material/Avatar';
import Popover from '@mui/material/Popover';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Iconify from 'src/components/iconify';
import { useDispatch } from 'react-redux';
import { BlockUser } from 'src/redux-toolkit/actions/userActions';

const UserTableRow = forwardRef(
  (
    { id, name, avatarURL, email, date_joined, post_count, comment_count, selected, handleClick },
    ref
  ) => {
    const [open, setOpen] = useState(null);
    const dispatch = useDispatch();

    const handleOpenMenu = (event) => {
      setOpen(event.currentTarget);
    };

    const handleCloseMenu = () => {
      setOpen(null);
    };

    const options = { month: 'short', day: 'numeric', year: 'numeric' };

    const formatDate = (dateString) => {
      const formattedDate = new Date(dateString).toLocaleDateString('en-US', options);
      const day = new Intl.DateTimeFormat('en', { day: 'numeric' }).format(new Date(dateString));
      const dayWithOrdinal =
        day + (/[0,4-9]/.test(day) ? 'th' : ['st', 'nd', 'rd'][(day % 10) - 1]);
      return formattedDate.replace(day, dayWithOrdinal);
    };

    const token = localStorage.getItem('token');

    const handleblock = () => {
      dispatch(BlockUser(id, token));
    };
    return (
      <>
        <TableRow key={id} hover tabIndex={-1} ref={ref} role="checkbox" selected={selected}>
          <TableCell padding="checkbox">
            <Checkbox disableRipple checked={selected} onChange={handleClick} />
          </TableCell>

          <TableCell component="th" scope="row" padding="none">
            <Stack direction="row" alignItems="center" spacing={2}>
              <Avatar
                alt={name}
                src={avatarURL || '../../../public/assets/images/avatars/avatar_1.jpg'}
              />
              <Typography variant="subtitle2" noWrap>
                {name}
              </Typography>
            </Stack>
          </TableCell>

          <TableCell>{formatDate(date_joined)}</TableCell>

          <TableCell>{email}</TableCell>
          <TableCell>{post_count}</TableCell>
          <TableCell>{comment_count}</TableCell>

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
          <MenuItem onClick={handleCloseMenu}>
            <Button color="inherit" onClick={handleblock}>
              <Iconify icon="material-symbols:block" sx={{ mr: 2 }} />
              Block
            </Button>
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

UserTableRow.propTypes = {
  id: PropTypes.any,
  selected: PropTypes.any,
  avatarURL: PropTypes.any,
  email: PropTypes.any,
  post_count: PropTypes.any,
  comment_count: PropTypes.any,
  handleClick: PropTypes.func,
  name: PropTypes.any,
  date_joined: PropTypes.any,
};

export default UserTableRow;

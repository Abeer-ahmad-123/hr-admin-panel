import React from 'react';
import PropTypes from 'prop-types';
import Tooltip from '@mui/material/Tooltip';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
// import MenuItem from '@mui/material/MenuItem';
// import Select from '@mui/material/Select';

import Iconify from 'src/components/iconify';

export default function UserTableToolbar({ numSelected, filterName, onFilterName, users }) {
  return (
    <Toolbar
      sx={{
        height: 96,
        display: 'flex',
        justifyContent: 'space-between',
        filter: 'drop-shadow(40px 20px 8px rgba(0, 0, 0, 0.1))',
        p: (theme) => theme.spacing(0, 1, 0, 3),
        ...(numSelected > 0 && {
          color: 'primary.main',
          bgcolor: 'primary.lighter',
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography component="div" variant="subtitle1">
          {numSelected} selected
        </Typography>
      ) : (
        <OutlinedInput
          // value={filterName}
          onChange={onFilterName}
          placeholder="Search user..."
          startAdornment={
            <InputAdornment position="start">
              <Iconify
                icon="eva:search-fill"
                sx={{ color: 'text.disabled', width: 20, height: 20 }}
              />
            </InputAdornment>
          }
          endAdornment={
            <InputAdornment position="end">
              {/* <Select
                value={option}
                onChange={(event) => {
                  console.log('Selected option:', event.target.value);
                  setOption(event.target.value); // Set the selected value to the state
                }}
                displayEmpty
                inputProps={{ 'aria-label': 'Select option' }}
              >
                <MenuItem value="" disabled>
                  Select searching option
                </MenuItem>
                <MenuItem value="username">Name</MenuItem>
                <MenuItem value="joining_date">Joining Date</MenuItem>

                <MenuItem value="email">Email</MenuItem>
                <MenuItem value="post_count">Post Count</MenuItem>
                <MenuItem value="comment_count">Comment Count</MenuItem>
              </Select> */}
            </InputAdornment>
          }
        />
      )}

      {numSelected > 0 && (
        <Tooltip title="Delete">
          <IconButton>
            <Iconify icon="eva:trash-2-fill" />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
}

UserTableToolbar.propTypes = {
  numSelected: PropTypes.number,
  filterName: PropTypes.string,
  onFilterName: PropTypes.func,
  users: PropTypes.arrayOf(PropTypes.object),
  // option: PropTypes.any,
  // setOption: PropTypes.any,
};

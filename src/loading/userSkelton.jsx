import React from 'react';
import Stack from '@mui/material/Stack';
import Skeleton from '@mui/material/Skeleton';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

const UserRowSkelton = () => (
  <TableRow role="checkbox">
    <TableCell padding="checkbox" />
    <TableCell component="th" scope="row" padding="none">
      <Stack direction="row" alignItems="center" spacing={2}>
        <Skeleton animation="wave" variant="circular" width={40} height={40} />
        <Skeleton width={100} height={30} />
      </Stack>
    </TableCell>
    <TableCell>
      <Skeleton width={100} height={30} />
    </TableCell>
    <TableCell>
      {' '}
      <Skeleton width={100} height={30} />
    </TableCell>
    <TableCell align="right">
      <Skeleton width={30} height={30} />
    </TableCell>
    <TableCell align="right">
      <Skeleton width={30} height={30} />
    </TableCell>{' '}
    <TableCell align="right">
      <Skeleton width={30} height={30} />
    </TableCell>{' '}
    <TableCell align="right">
      <Skeleton width={5} height={40} />
    </TableCell>
  </TableRow>
);

export default UserRowSkelton;

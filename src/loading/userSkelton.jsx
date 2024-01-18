import React from 'react';
import Stack from '@mui/material/Stack';
import Skeleton from '@mui/material/Skeleton';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

const UserRowSkelton = () => (
  // <Stack
  //   direction="row"
  //   sx={{
  //     bgcolor: '#b8c1cf',
  //     width: '100%',
  //     justifyContent: 'space-between',

  //     borderRadius: '10px',
  //     paddingX: '35px',
  //   }}
  // >
  //   <Stack direction="row" sx={{ gap: '4px' }}>
  //     <Skeleton variant="circular" width={50} height={50} />
  //     <Skeleton width={100} height={50} />
  //   </Stack>
  //   <Stack direction="row" sx={{ gap: '6rem' }}>
  //     <Skeleton width={100} height={50} />
  //     <Skeleton width={100} height={50} />
  //   </Stack>
  //   <Skeleton width={10} height={50} />
  // </Stack>

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
      <Skeleton width={5} height={40} />
    </TableCell>
  </TableRow>
);

export default UserRowSkelton;

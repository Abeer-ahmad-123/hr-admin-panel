import React from 'react';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import UserTableHead from 'src/sections/user/user-table-head';

const UserRowSkelton = () => {
  return (
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

    <Table>
      <TableBody>
        <TableRow role="checkbox">
          <TableCell padding="checkbox"></TableCell>

          <TableCell component="th" scope="row" padding="none">
            <Stack direction="row" alignItems="center" spacing={2}>
              <Skeleton variant="circular" width={50} height={50} />
              <Skeleton width={100} height={50} />
            </Stack>
          </TableCell>

          <TableCell>
            <Skeleton width={100} height={50} />
          </TableCell>

          <TableCell>
            {' '}
            <Skeleton width={100} height={50} />
          </TableCell>

          <TableCell align="right">
            <Skeleton width={100} height={50} />
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};

export default UserRowSkelton;

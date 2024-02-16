import React from 'react';
import TableRow from '@mui/material/TableRow';

import TableCell from '@mui/material/TableCell';
import Skeleton from '@mui/material/Skeleton';

const ChannelPostSkelton = () => (
  <TableRow hover tabIndex={-1} role="checkbox">
    <TableCell padding="checkbox" />
    <TableCell padding="checkbox" />

    <TableCell>
      <Skeleton width={80} height={30} />
    </TableCell>
    <TableCell>
      <Skeleton width={80} height={30} />
    </TableCell>
    <TableCell>
      <Skeleton width={80} height={30} />
    </TableCell>
    <TableCell align="right">
      <Skeleton width={80} height={30} />
    </TableCell>
    <TableCell align="right">
      <Skeleton width={80} height={30} />
    </TableCell>
    <TableCell align="right">
      <Skeleton width={5} height={40} />
    </TableCell>
  </TableRow>
);

export default ChannelPostSkelton;

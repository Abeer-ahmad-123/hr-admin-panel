import React from 'react';
import PropTypes from 'prop-types';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import TableHead from '@mui/material/TableHead';
import TableCell from '@mui/material/TableCell';

const ChannalTableHead = ({ selectedReport }) => (
  <TableHead>
    <TableRow>
      <TableCell padding="checkbox">
        <Checkbox
        // indeterminate={numSelected > 0 && numSelected < rowCount}
        // checked={rowCount > 0 && numSelected === rowCount}
        // onChange={onSelectAllClick}
        />
      </TableCell>
      <TableCell>Report Id</TableCell>
      <TableCell>Report type</TableCell>
      <TableCell>User Id</TableCell>
      <TableCell>{selectedReport} Id</TableCell>
      <TableCell align="right"> options </TableCell>
    </TableRow>
  </TableHead>
);

ChannalTableHead.propTypes = {
  selectedReport: PropTypes.any,
};

export default ChannalTableHead;

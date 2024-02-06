import PropTypes from 'prop-types';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import TableCell from '@mui/material/TableCell';

const ChannalTableRow = ({ data }) => (
  <TableRow key={data.id} hover tabIndex={-1} role="checkbox">
    <TableCell padding="checkbox">
      <Checkbox disableRipple checked={false} />
    </TableCell>

    <TableCell>{data.id}</TableCell>
    <TableCell>{data.reportType}</TableCell>
    <TableCell>{data.userId}</TableCell>
    <TableCell>{data.postId ?? data.commentId}</TableCell>
  </TableRow>
);
ChannalTableRow.propTypes = {
  data: PropTypes.any,
};
export default ChannalTableRow;

import PropTypes from 'prop-types';

import TableBody from '@mui/material/TableBody';
import ChannalTableRow from '../../../Channal-table.row';

const CommentsReport = ({ data }) => (
  <>
    {data?.length &&
      // eslint-disable-next-line no-shadow
      data.map((data) => (
        <TableBody key={data.id}>
          <ChannalTableRow data={data} />
        </TableBody>
      ))}
  </>
);

CommentsReport.propTypes = {
  data: PropTypes.any,
};
export default CommentsReport;

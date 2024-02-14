import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

import TableBody from '@mui/material/TableBody';
import ReportTableRow from '../../../Report-table.row';

const CommentsReport = ({ data }) => {
  const [totalReports, setTotalReports] = useState([]);

  useEffect(() => {
    setTotalReports(data);
  }, [data]);

  return (
    <>
      {totalReports?.length &&
        // eslint-disable-next-line no-shadow
        totalReports?.map((data) => (
          <TableBody key={data.id}>
            <ReportTableRow data={data} />
          </TableBody>
        ))}
    </>
  );
};

CommentsReport.propTypes = {
  data: PropTypes.any,
};
export default CommentsReport;

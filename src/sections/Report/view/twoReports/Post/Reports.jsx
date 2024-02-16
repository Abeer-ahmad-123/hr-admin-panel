import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
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
        totalReports?.map((data) => <ReportTableRow key={data?.id} data={data} />)}
    </>
  );
};

CommentsReport.propTypes = {
  data: PropTypes.any,
};
export default CommentsReport;

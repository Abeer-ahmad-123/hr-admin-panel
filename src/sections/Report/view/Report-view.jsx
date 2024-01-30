import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import Scrollbar from 'src/components/scrollbar';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import ReportRowSkelton from 'src/loading/reportsSkelton';
import { allReports } from 'src/redux-toolkit/actions/reportsAction';
import { useAuth } from 'src/hooks/interceptors';
import ChannalTableHead from '../Report-table-head';
import CommentsReport from './twoReports/Post/Reports';

const ReportView = () => {
  const dispatch = useDispatch();
  const { loading, reports, error } = useSelector((state) => state.reports);
  const authToken = useSelector((state) => state.auth?.accessToken);

  const [selectedReport, setSelectedReport] = useState('post');
  const { setupApiInterceptor } = useAuth();
  const fetchData = async () => {
    // eslint-disable-next-line no-useless-catch
    try {
      dispatch(allReports({ authToken, setupApiInterceptor }));
    } catch (fetchError) {
      throw error;
    }
  };
  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleButtonClick = (selectedReportType) => {
    setSelectedReport(selectedReportType);
  };

  const handlePostButtonClick = () => {
    handleButtonClick('post');
  };

  const handleCommentButtonClick = () => {
    handleButtonClick('comment');
  };

  return (
    <Container>
      <Stack direction="row" alignItems="center" mb={5}>
        <Button
          id="post"
          onClick={handlePostButtonClick}
          sx={{
            position: 'relative',
            display: 'block',
            color: selectedReport === 'post' ? '#5141DF ' : 'gray',
            '&:hover': {
              color: '#5141DF',
              background: 'none',
            },

            '&:after': {
              content: '""',
              position: 'absolute',
              height: '3px',
              backgroundColor: '#5141DF',
              width: selectedReport === 'post' ? '80px' : ' 0px',
              left: '9px',
              bottom: '-10px',
              transition: '1s',
            },
          }}
        >
          Post reports
        </Button>

        <Button
          id="comment"
          onClick={handleCommentButtonClick}
          sx={{
            color: selectedReport === 'comment' ? '#5141DF ' : 'gray',

            '&:hover': {
              color: '#5141DF',
              background: 'none',
            },

            '&:after': {
              content: '""',
              position: 'absolute',
              height: '3px',
              backgroundColor: '#5141DF',
              width: selectedReport === 'comment' ? '117px' : ' 0px',
              left: '9px',
              bottom: '-10px',
              transition: '1s',
            },
          }}
        >
          Comment reports
        </Button>
      </Stack>
      <Card>
        <Scrollbar>
          <TableContainer sx={{ overflow: 'unset' }}>
            <Table sx={{ minWidth: 800 }}>
              <ChannalTableHead selectedReport={selectedReport === 'post' ? 'Post' : 'Comment'} />

              {loading ? (
                <TableBody>
                  {Array.from({ length: 10 }, (_, index) => (
                    <ReportRowSkelton key={index} />
                  ))}
                </TableBody>
              ) : (
                <CommentsReport
                  data={selectedReport === 'post' ? reports.post_reports : reports.comment_reports}
                />
              )}
            </Table>
          </TableContainer>
        </Scrollbar>
      </Card>
    </Container>
  );
};

export default ReportView;

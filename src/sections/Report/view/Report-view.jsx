/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import { useSnackbar } from 'notistack';
import Scrollbar from 'src/components/scrollbar';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import { setdeletedState } from 'src/redux-toolkit/reducers/reportsReducer';
import Typography from '@mui/material/Typography';
import ReportRowSkelton from 'src/loading/reportsSkelton';
import { allReports } from 'src/redux-toolkit/actions/reportsAction';
import { useAuth } from 'src/hooks/interceptors';
import ChannalTableHead from '../Report-table-head';
import ReportTableRow from '../Report-table.row';

const ReportView = () => {
  const [selectedReport, setSelectedReport] = useState('post');

  const { setupApiInterceptor } = useAuth();
  const dispatch = useDispatch();

  const { loading, reports, error, deleted } = useSelector((state) => state.reports);
  const authToken = useSelector((state) => state.auth?.accessToken);
  const { enqueueSnackbar } = useSnackbar();

  const fetchData = async () => {
    // eslint-disable-next-line no-useless-catch
    try {
      dispatch(allReports({ authToken, setupApiInterceptor }));
    } catch (fetchError) {
      throw error;
    }
  };

  const handleButtonClick = (selectedReportType) => {
    setSelectedReport(selectedReportType);
  };

  const handlePostButtonClick = () => {
    handleButtonClick('post');
  };

  const handleCommentButtonClick = () => {
    handleButtonClick('comment');
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (deleted.requestStatus === 'fulfilled') {
      fetchData();
      enqueueSnackbar(`delete Successfully`, {
        variant: 'success',
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'right',
        },
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deleted.requestId]);

  /* eslint-disable arrow-body-style */
  useEffect(() => {
    // eslint-disable-next-line arrow-body-style
    return () => dispatch(setdeletedState());
  }, []);
  /* eslint-enable arrow-body-style */

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
          Reported Posts
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
          Reported Comments
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
                <TableBody>
                  {selectedReport === 'post' &&
                    reports.post_reports?.map((datastate) => (
                      <ReportTableRow key={datastate.id} data={datastate} />
                    ))}
                  {selectedReport === 'comment' &&
                    reports.comment_reports?.map((datastate) => (
                      <ReportTableRow key={datastate.id} data={datastate} />
                    ))}
                </TableBody>
              )}
            </Table>
          </TableContainer>
        </Scrollbar>
      </Card>

      {selectedReport === 'post' && reports?.post_reports?.length === 0 && (
        <Typography
          variant="h3"
          color="gray"
          sx={{ textAlign: 'center', mt: 5, textTransform: 'capitalize' }}
        >
          {' '}
          there are no reported posts
        </Typography>
      )}
      {selectedReport === 'comment' && reports?.comment_reports?.length === 0 && (
        <Typography
          variant="h3"
          color="gray"
          sx={{ textAlign: 'center', mt: 5, textTransform: 'capitalize' }}
        >
          {' '}
          there are no reported comments
        </Typography>
      )}
    </Container>
  );
};

export default ReportView;

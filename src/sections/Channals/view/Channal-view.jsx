import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import Scrollbar from 'src/components/scrollbar';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import { clearAuth } from 'src/redux-toolkit/reducers/loginReducer';

import ReportRowSkelton from 'src/loading/reportsSkelton';

import { allReports } from 'src/redux-toolkit/actions/reportsAction';
import { useNavigate } from 'react-router-dom';
import ChannalTableHead from '../Channal-table-head';
import CommentsReport from './twoReports/Post/Reports';

const ChannalView = () => {
  const dispatch = useDispatch();
  const { loading, reports, error } = useSelector((state) => state.reports);

  const [selectedReport, setSelectedReport] = useState('post');

  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      // eslint-disable-next-line no-useless-catch
      try {
        dispatch(allReports());
      } catch (fetchError) {
        throw error;
      }
    };

    fetchData();
  }, [dispatch, error]);
  if (error) {
    localStorage.removeItem('token');
    localStorage.removeItem('refresh-token');
    dispatch(clearAuth());
    navigate('/login');
  }

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">
          {selectedReport === 'post' ? 'post Reports' : 'comment Reports'}{' '}
        </Typography>
        <Button onClick={() => setSelectedReport('post')}>Post reports</Button>
        <Button onClick={() => setSelectedReport('comment')}>Comment reports</Button>
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

export default ChannalView;

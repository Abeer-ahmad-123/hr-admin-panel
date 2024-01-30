// ChannelDetailPage.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import Scrollbar from 'src/components/scrollbar';
import UserSkelton from 'src/loading/userSkelton';
import ChannelTableRow from './channels-table-row';
import ChannelTableHead from './channels-table-head';
import ChannelEmptyRows from './table-empty-rows';
import ChannelTableToolbar from './channels-table-toolbar';
import { channelData, channelHeadLabel } from '../../utils/data';
import { showErrorAlert } from '../../utils/helper/toast';

const ChannelDetailPage = () => {
  const { id: channelId } = useParams(); // Get channel ID from URL parameters
  const [loading, setLoading] = useState(true);
  const [option, setOption] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(false);
  }, []);

  const handleFilterByName = () => {
    // Filter logic
  };
  const handlePostClick = (e) => {
    try {
      navigate(`/channels/${channelId}/${e.target.id}`); // Navigate to channel detail page with channel ID
    } catch (error) {
      showErrorAlert(error);
    }
  };

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">{`Channel Detail (${channelId})`}</Typography>
      </Stack>

      <Card>
        <ChannelTableToolbar
          numSelected={0}
          filterName=""
          channel={channelData}
          onFilterName={handleFilterByName}
          setOption={setOption}
          option={option}
        />

        <Scrollbar>
          {/* import from util */}
          <TableContainer sx={{ overflow: 'unset' }}>
            <Table sx={{ minWidth: 800 }}>
              <ChannelTableHead rowCount={5} numSelected={5} headLabel={channelHeadLabel} />

              {loading && (
                <TableBody>
                  {Array.from({ length: 10 }, (_, index) => (
                    <UserSkelton key={index} />
                  ))}
                </TableBody>
              )}

              {!loading &&
                channelData.map((data, index) => (
                  <TableBody key={data.id}>
                    <ChannelTableRow
                      key={data.id}
                      id={data.id}
                      author={data.author}
                      title={data.title}
                      description={data.description}
                      like={data.like}
                      total_comments={data.total_comments}
                      reactions={data.reactions}
                      selected={false}
                      onPostClick={handlePostClick} // Pass post ID on click
                    />

                    <ChannelEmptyRows height={77} />
                  </TableBody>
                ))}
            </Table>
          </TableContainer>
        </Scrollbar>
      </Card>
    </Container>
  );
};

export default ChannelDetailPage;

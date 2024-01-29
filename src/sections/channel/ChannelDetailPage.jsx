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
import CHannelEmptyRows from './table-empty-rows';
import ChannelTableToolbar from './channels-table-toolbar';

const ChannelDetailPage = () => {
  const { id: channelId } = useParams(); // Get channel ID from URL parameters
  const [loading, setLoading] = useState(true);
  const [option, setOption] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Simulating data fetching delay with setTimeout
    setTimeout(() => {
      setLoading(false); // Set loading to false after data fetching delay
    }, 2000); // Simulating 2 seconds delay
  }, []);

  const handleFilterByName = () => {
    // Filter logic
  };
  const handlePostClick = (id) => {
    try {
      navigate(`/channels/${channelId}/${id}`); // Navigate to channel detail page with channel ID
    } catch (error) {
      console.error('Error navigating to channel detail page:', error);
    }
  };
  const channelData = [
    {
      id: '1',
      author: 'Dawood Israr',
      title: 'MERN',
      description: 'Development',
      like: '10',
      total_comments: '15',
      reactions: '20',
    },

    {
      id: '2',
      author: 'Awais Mubbashar',
      title: 'Mobile Apps',
      description: 'Development',
      like: '10',
      total_comments: '15',
      reactions: '20',
    },
    // Add more sample data as needed
  ];

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
          <TableContainer sx={{ overflow: 'unset' }}>
            <Table sx={{ minWidth: 800 }}>
              <ChannelTableHead
                rowCount={5}
                numSelected={5}
                headLabel={[
                  { id: 'author', label: 'Author' },
                  { id: 'title', label: 'Title' },
                  { id: 'description', label: 'Description' },
                  { id: 'like', label: 'Like' },
                  { id: 'total_comments', label: 'Total Comments' },
                  { id: 'reactions', label: 'Reactions' },
                  { id: '' },
                ]}
              />

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
                      onPostClick={() => handlePostClick(data.id)} // Pass post ID on click
                    />

                    <CHannelEmptyRows height={77} />
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

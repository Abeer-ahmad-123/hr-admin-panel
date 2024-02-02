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
import { useInView } from 'react-intersection-observer';
import Scrollbar from 'src/components/scrollbar';
import { channelById } from 'src/redux-toolkit/actions/channelAction';
import UserSkelton from 'src/loading/userSkelton';
import { useDispatch, useSelector } from 'react-redux';
import { PulseLoader } from 'react-spinners';
import { useAuth } from 'src/hooks/interceptors';
import ChannelTableRow from './channels-table-row';
import ChannelTableHead from './channels-table-head';
import ChannelEmptyRows from './table-empty-rows';
import ChannelTableToolbar from './channels-table-toolbar';

import { showErrorAlert } from '../../utils/helper/toast';

const ChannelDetailPage = () => {
  const { id: channelId } = useParams();

  const [loading, setLoading] = useState(true);
  const [option, setOption] = useState('');
  const [postDetails, setPostDetails] = useState([]);

  const [reactions, setReactions] = useState(0);

  const [page, setPage] = useState(1);

  const [ref, inView] = useInView();
  const navigate = useNavigate();
  const { setupApiInterceptor } = useAuth();
  const { posts, pagination } = useSelector((state) => state.channels?.channels);

  const dispatch = useDispatch();

  // Pagination code
  const Pagination = () => {
    if (page !== pagination?.TotalPages) {
      dispatch(channelById({ setupApiInterceptor, channelId, page }));
    }
  };

  const appendPostsDetails = () => {
    setPostDetails((prevDetails) => ({
      ...prevDetails,
      posts: [...(prevDetails?.posts || []), ...(posts || [])],
    }));

    setLoading(false);
  };

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
  useEffect(() => {
    Pagination();
    // eslint-disable-next-line
  }, [page]);

  useEffect(() => {
    if (posts?.length) {
      appendPostsDetails();
    }
    // eslint-disable-next-line
  }, [posts]);
  useEffect(() => {
    if (inView) {
      setPage((prevPage) => prevPage + 1);
    }
    // eslint-disable-next-line
  }, [inView]);

  useEffect(() => {
    if (!loading && postDetails) {
      const totalReactions = postDetails.posts.reduce((total, post) => {
        const { like_count, love_count, clap_count, celebrate_count } = post.reaction_summary;
        return total + like_count + love_count + clap_count + celebrate_count;
      }, 0);

      setReactions(totalReactions);
    }
  }, [loading, postDetails]);

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">{`Channel Detail (${channelId})`}</Typography>
      </Stack>

      <Card>
        <ChannelTableToolbar
          numSelected={0}
          filterName=""
          channel={posts}
          onFilterName={handleFilterByName}
          setOption={setOption}
          option={option}
        />

        <Scrollbar>
          {/* import from util */}
          <TableContainer sx={{ overflow: 'unset' }}>
            <Table sx={{ minWidth: 800 }}>
              <ChannelTableHead />

              {loading && (
                <TableBody>
                  {Array.from({ length: 10 }, (_, index) => (
                    <UserSkelton key={index} />
                  ))}
                </TableBody>
              )}

              {!loading &&
                postDetails?.posts?.map((data, index) => (
                  <TableBody key={data.id}>
                    <ChannelTableRow
                      key={data.id}
                      id={data.user_id}
                      title={data.title}
                      description={data.content}
                      image={data.image_url ?? ''}
                      comments={data.total_comments}
                      reactions={reactions}
                      //  selected={false}
                      onPostClick={handlePostClick} // Pass post ID on click
                    />

                    <ChannelEmptyRows height={77} />
                  </TableBody>
                ))}
            </Table>
          </TableContainer>
        </Scrollbar>
      </Card>
      {page !== pagination?.TotalPages && (
        <Stack
          direction="row"
          justifyContent="center"
          sx={{
            marginTop: '4rem',
          }}
          ref={ref}
        >
          <PulseLoader color="#5141df" />
        </Stack>
      )}
    </Container>
  );
};

export default ChannelDetailPage;

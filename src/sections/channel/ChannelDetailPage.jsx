/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import { useSnackbar } from 'notistack';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import { setChannelsStateEmpty } from 'src/redux-toolkit/reducers/channelReducer';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import { useInView } from 'react-intersection-observer';
import Scrollbar from 'src/components/scrollbar';
import { channelById } from 'src/redux-toolkit/actions/channelAction';
import ChannelPostSkelton from 'src/loading/ChannelPostSkelton';
import { useDispatch, useSelector } from 'react-redux';
import { PulseLoader } from 'react-spinners';
import { useAuth } from 'src/hooks/interceptors';
import ChannelTableRow from './channels-table-row';
import ChannelTableHead from './channels-table-head';
import ChannelEmptyRows from './table-empty-rows';
import { showErrorAlert } from '../../utils/helper/toast';

const ChannelDetailPage = () => {
  const { id: channelId } = useParams();

  const [customLoading, setcustomLoading] = useState(true);
  const [postDetails, setPostDetails] = useState([]);
  const [channelName, setChannelName] = useState('');
  const [reactions, setReactions] = useState(0);
  const [page, setPage] = useState(1);

  const { enqueueSnackbar } = useSnackbar();
  const [ref, inView] = useInView();
  const navigate = useNavigate();
  const { setupApiInterceptor } = useAuth();
  const dispatch = useDispatch();

  const { channels, channelsData } = useSelector((state) => state.channels);
  const { posts } = useSelector((state) => state?.channels?.channelsData);

  const getNameById = (array, id) => {
    const foundObject = array.find((item) => item.id === Number(id));
    if (foundObject) {
      return foundObject.name;
    }
    return 'No matching object found';
  };

  // Pagination code
  const Pagination = () => {
    if (page !== channelsData?.pagination?.TotalPages) {
      dispatch(channelById({ setupApiInterceptor, channelId, page }));
    }
  };

  const deletePost = (id) => {
    const newPostDetails = postDetails?.posts?.filter((post) => post.id !== id);

    setPostDetails({ posts: newPostDetails });
    enqueueSnackbar(`delete Successfully`, {
      variant: 'success',
      anchorOrigin: {
        vertical: 'top',
        horizontal: 'right',
      },
    });
  };

  const appendPostsDetails = () => {
    setPostDetails((prevDetails) => {
      const prevPosts = prevDetails.posts || [];

      const uniquePostIds = new Set(prevPosts.map((post) => post.id));

      const filteredPosts = posts.filter((post) => !uniquePostIds.has(post.id));

      const updatedPosts = [...prevPosts, ...filteredPosts];

      return {
        ...prevDetails,
        posts: updatedPosts,
      };
    });

    setcustomLoading(false);
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
  }, [page]);

  useEffect(() => {
    if (posts?.length) {
      appendPostsDetails();
    }
  }, [posts]);
  useEffect(() => {
    if (inView) {
      setPage((prevPage) => prevPage + 1);
    }
  }, [inView]);

  useEffect(() => {
    if (channels?.channels?.length) {
      setChannelName(getNameById(channels?.channels, channelId));
    }
  }, [channels?.channels]);

  useEffect(() => {
    if (!customLoading && postDetails) {
      const totalReactions = postDetails?.posts?.reduce((total, post) => {
        const { like_count, love_count, clap_count, celebrate_count } = post.reaction_summary;
        return total + like_count + love_count + clap_count + celebrate_count;
      }, 0);

      setReactions(totalReactions);
    }
  }, [customLoading, postDetails]);

  /* eslint-disable arrow-body-style */
  useEffect(() => {
    return () => dispatch(setChannelsStateEmpty());
  }, []);
  /* eslint-enable arrow-body-style */

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4"> {`${channelName} Detail`}</Typography>
      </Stack>

      <Card>
        <Scrollbar>
          <TableContainer sx={{ overflow: 'unset' }}>
            <Table sx={{ minWidth: 800 }}>
              <ChannelTableHead />

              {customLoading && (
                <TableBody>
                  {Array.from({ length: 10 }, (_, index) => (
                    <ChannelPostSkelton key={index} />
                  ))}
                </TableBody>
              )}

              {!customLoading &&
                postDetails?.posts?.map((data, index) => (
                  <TableBody key={data.id}>
                    <ChannelTableRow
                      key={data.id}
                      id={data.id}
                      post_id={data.id}
                      title={data.title}
                      description={data.content}
                      image={data.image_url ?? ''}
                      comments={data.total_comments}
                      reactions={reactions}
                      deletePost={deletePost}
                      onPostClick={handlePostClick} // Pass post ID on click
                    />

                    <ChannelEmptyRows height={77} />
                  </TableBody>
                ))}
            </Table>
          </TableContainer>
        </Scrollbar>
      </Card>
      {page !== channelsData?.pagination?.TotalPages && (
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

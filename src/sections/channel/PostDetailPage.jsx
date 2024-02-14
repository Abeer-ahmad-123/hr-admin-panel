import React, { useEffect } from 'react';

import { useParams } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import Avatar from '@mui/material/Avatar';
import { useSnackbar } from 'notistack';
import Typography from '@mui/material/Typography';
import { setDelCommentState } from 'src/redux-toolkit/reducers/channelReducer';
import PostsDetailsSkelton from 'src/loading/PostsDetailsSkelton';
import { useAuth } from 'src/hooks/interceptors';
import { useDispatch, useSelector } from 'react-redux';
import { PostsByUserId, getpostComments } from 'src/redux-toolkit/actions/channelAction';
import CommentsPage from './CommentsPage';

const PostDetailPage = () => {
  const { id } = useParams();

  const { setupApiInterceptor } = useAuth();
  const dispatch = useDispatch();
  const { commentsData, delComments, loading } = useSelector((state) => state.channels);
  const { post } = useSelector((state) => state.channels?.channelsPostData);
  const { enqueueSnackbar } = useSnackbar();

  const fetchData = async () => {
    // eslint-disable-next-line no-useless-catch
    try {
      await dispatch(PostsByUserId({ setupApiInterceptor, id }));
      dispatch(getpostComments({ setupApiInterceptor, id }));
    } catch (error) {
      throw error;
    }
  };

  const options = { month: 'short', day: 'numeric', year: 'numeric' };
  const formatDate = (dateString) => {
    if (!dateString) return ''; // Add this check to handle null or undefined values

    const formattedDate = new Date(dateString).toLocaleDateString('en-US', options);
    const day = new Intl.DateTimeFormat('en', { day: 'numeric' }).format(new Date(dateString));
    const dayWithOrdinal = day + (/[0,4-9]/.test(day) ? 'th' : ['st', 'nd', 'rd'][(day % 10) - 1]);
    return formattedDate.replace(day, dayWithOrdinal);
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, [id]);

  useEffect(() => {
    if (delComments.requestStatus === 'fulfilled') {
      dispatch(getpostComments({ setupApiInterceptor, id }));

      enqueueSnackbar(`delete Successfully`, {
        variant: 'success',
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'right',
        },
      });
    }

    // eslint-disable-next-line
  }, [delComments.requestId]);

  /* eslint-disable arrow-body-style */
  useEffect(() => {
    // eslint-disable-next-line arrow-body-style
    return () => dispatch(setDelCommentState());
    // eslint-disable-next-line
  }, []);
  /* eslint-enable arrow-body-style */

  return (
    <Stack>
      {loading ? (
        <PostsDetailsSkelton />
      ) : (
        <Card key={post?.id} sx={{ maxWidth: '100vw', marginBottom: '20px' }}>
          <CardHeader
            avatar={
              <Avatar aria-label="recipe" src={post?.author_details?.profile_picture_url} /> // Use src attribute to assign the imported image
            }
            title={post?.author_details?.name}
            // subheader={formatDate(post?.created_at)}
            subheader={formatDate(post?.created_at)}
          />
          {post?.image_url ? (
            <CardMedia
              component="img"
              height="194"
              image={post?.image_url}
              alt=""
              sx={{ width: 'auto', objectFit: 'fill', padding: '20px' }}
            />
          ) : (
            <>
              <Typography sx={{ padding: '20px 20px 0px 20px' }} variant="h4">
                {post?.title}{' '}
              </Typography>
              <Typography sx={{ padding: '20px 20px 0px 20px' }}>{post?.content} </Typography>
            </>
          )}
          <CardContent>
            <hr />
            {/*  return the comment compoennet here */}
            <CommentsPage post={post} id={id} commentsData={commentsData} />
          </CardContent>
        </Card>
      )}
    </Stack>
  );
};

export default PostDetailPage;

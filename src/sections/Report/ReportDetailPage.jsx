/* eslint-disable no-nested-ternary */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import PostsDetailsSkelton from 'src/loading/PostsDetailsSkelton';
import { useAuth } from 'src/hooks/interceptors';
import { useDispatch, useSelector } from 'react-redux';
import {
  reportedComments,
  reportedPostData,
  reportedCommentsData,
  reportedPosts,
  commentsByCommentId,
} from 'src/redux-toolkit/actions/reportsAction';
import { setcommentsData, setdataStateEmpty } from 'src/redux-toolkit/reducers/reportsReducer';
import { Post_CommentsArea, Comment_CommentsArea } from './CommentsArea';

const ReportDetailPage = () => {
  const [reportedData, setReportedData] = useState(null);

  const { name, id } = useParams();
  const { setupApiInterceptor } = useAuth();
  const dispatch = useDispatch();
  const { reportedPostComment, reportedCommentInfo, loading } = useSelector(
    (state) => state.reports
  );

  const dispatcherFn = () => {
    if (name === 'post') {
      dispatch(reportedPosts({ setupApiInterceptor, id }));
    } else {
      dispatch(reportedComments({ setupApiInterceptor, id }));
    }
  };

  const postId = reportedData?.post_id;

  const getReportedPostData = () => {
    if (name === 'post') {
      dispatch(reportedPostData({ setupApiInterceptor, id }));
    }
  };
  const getReportedCommentData = () => {
    if (name === 'comment' && postId) {
      dispatch(reportedCommentsData({ setupApiInterceptor, postId }));
      dispatch(commentsByCommentId({ setupApiInterceptor, id }));
    }
  };

  const options = { month: 'short', day: 'numeric', year: 'numeric' };
  const formatDate = (dateString) => {
    if (!dateString) return '';

    const formattedDate = new Date(dateString).toLocaleDateString('en-US', options);
    const day = new Intl.DateTimeFormat('en', { day: 'numeric' }).format(new Date(dateString));
    const dayWithOrdinal = day + (/[0,4-9]/.test(day) ? 'th' : ['st', 'nd', 'rd'][(day % 10) - 1]);
    return formattedDate.replace(day, dayWithOrdinal);
  };

  useEffect(() => {
    dispatcherFn();
    getReportedPostData();
  }, [id]);

  useEffect(() => {
    getReportedCommentData();
  }, [postId]);

  useEffect(() => {
    setReportedData(reportedPostComment.comment || reportedPostComment.post);
  }, [reportedPostComment]);

  useEffect(() => {
    // eslint-disable-next-line
    reportedCommentInfo?.length !== 0 && setReportedData(reportedCommentInfo?.post);
    // eslint-disable-next-line
  }, [reportedCommentInfo]);

  /* eslint-disable arrow-body-style */
  useEffect(() => {
    // eslint-disable-next-line arrow-body-style
    return () => {
      dispatch(setdataStateEmpty());
      dispatch(setcommentsData());
    };
  }, []);
  /* eslint-enable arrow-body-style */

  return (
    <Stack>
      {loading ? (
        <PostsDetailsSkelton />
      ) : (
        <Card key={reportedData?.id} sx={{ maxWidth: '100vw', marginBottom: '20px' }}>
          <CardHeader
            avatar={
              <Avatar aria-label="recipe" src={reportedData?.author_details?.profile_picture_url} /> // Use src attribute to assign the imported image
            }
            title={reportedData?.author_details?.name || 'abcd'}
            subheader={formatDate(reportedData?.created_at)}
          />
          {reportedData?.image_url ? (
            <CardMedia
              component="img"
              height="194"
              image={reportedData?.image_url}
              alt=""
              sx={{ width: 'auto', objectFit: 'fill', padding: '20px' }}
            />
          ) : (
            <>
              <Typography sx={{ padding: '20px 20px 0px 20px' }} variant="h4">
                {reportedData?.title || ''}
              </Typography>
              <Typography sx={{ padding: '20px 20px 0px 20px' }}>
                {reportedData?.content}
              </Typography>
            </>
          )}
          <CardContent>
            <hr />
            {/*
  eslint-disable-next-line react/jsx-pascal-case
*/}
            {name === 'post' && <Post_CommentsArea />}

            {/*
  eslint-disable-next-line react/jsx-pascal-case
*/}
            {name === 'comment' && <Comment_CommentsArea />}
          </CardContent>
        </Card>
      )}
    </Stack>
  );
};

export default ReportDetailPage;

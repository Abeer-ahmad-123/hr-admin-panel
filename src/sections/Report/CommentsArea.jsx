import React, { useState, useEffect } from 'react';

import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import { Container } from '@mui/material';
import { useSelector } from 'react-redux';

export const Post_CommentsArea = () => {
  const [reportedData, setReportedData] = useState(null);

  const { reportedPostInfo } = useSelector((state) => state.reports);

  useEffect(() => {
    setReportedData(reportedPostInfo);

    // eslint-disable-next-line
  }, [reportedPostInfo]);

  return (
    <>
      {reportedData?.comments?.map((data) => (
        <div key={data?.id}>
          <Container style={{ marginBottom: '20px', display: 'flex' }}>
            <Avatar aria-label="recipe" src={data?.author_details?.profile_picture_url} />
            <Container
              style={{
                position: 'relative',
                backgroundColor: 'RGB(241, 245, 249)',
                borderRadius: '20px',
                width: 'auto',
                height: 'auto',
                padding: '15px',
                margin: '0px',
              }}
            >
              <Typography color="#571CE1">{data?.author_details?.name || 'abcd'}</Typography>
              <Typography color="#4B5563">{data?.content}</Typography>
            </Container>
          </Container>

          <Container
            sx={{
              width: 'auto',
              height: 'auto',
              display: data?.total_replies === 0 ? 'none' : 'flex',
              gap: '10px',
              marginLeft: '60px',
              marginTop: '30px',
            }}
          >
            <Avatar
              sx={{ bgcolor: red[500] }}
              aria-label="recipe"
              src={data?.author_details?.profile_picture_url}
            />
            <Container
              style={{
                position: 'relative',
                width: 'auto',
                backgroundColor: 'RGB(241, 245, 249)',
                borderRadius: '20px',
                padding: '15px',
                marginLeft: '0px',
              }}
            >
              <Typography color="#571CE1">{data?.author_details?.name}</Typography>

              {data?.replies?.map((reply) => (
                <Typography key={reply?.id} color="#4B5563">
                  {reply?.content}
                </Typography>
              ))}
            </Container>
          </Container>
        </div>
      ))}
    </>
  );
};

export const Comment_CommentsArea = () => {
  const [reportedData, setReportedData] = useState(null);
  const [commentData, setCommentData] = useState(null);

  const { reportedPostComment, reportedCommentInfo, commentsData } = useSelector(
    (state) => state.reports
  );

  useEffect(() => {
    setReportedData(reportedCommentInfo?.post);

    // eslint-disable-next-line
  }, [reportedCommentInfo]);
  useEffect(() => {
    setCommentData(commentsData);

    // eslint-disable-next-line
  }, [reportedPostComment]);

  return (
    <>
      <Container style={{ marginBottom: '20px', display: 'flex' }}>
        <Avatar aria-label="recipe" src={reportedData?.author_details?.profile_picture_url} />
        <Container
          style={{
            position: 'relative',
            backgroundColor: 'RGB(241, 245, 249)',
            borderRadius: '20px',
            width: 'auto',
            height: 'auto',
            padding: '15px',
            margin: '0px',
          }}
        >
          <Typography color="#571CE1">{reportedData?.author_details?.name}</Typography>
          <Typography color="#4B5563">{commentData?.comment?.content}</Typography>
        </Container>
      </Container>

      <Container
        sx={{
          width: 'auto',
          height: 'auto',
          display: commentData?.comment?.total_replies === 0 ? 'none' : 'flex',
          gap: '10px',
          marginLeft: '60px',
          marginTop: '30px',
        }}
      >
        <Avatar
          sx={{ bgcolor: red[500] }}
          aria-label="recipe"
          src={reportedData?.author_details?.profile_picture_url}
        />
        <Container
          style={{
            position: 'relative',
            width: 'auto',
            backgroundColor: 'RGB(241, 245, 249)',
            borderRadius: '20px',
            padding: '15px',
            marginLeft: '0px',
          }}
        >
          <Typography color="#571CE1">{reportedData?.author_details?.name || 'abcd'}</Typography>

          {commentData?.comment?.replies?.map((reply) => (
            <Typography color="#4B5563">
              {reply?.content || commentData?.comment?.content}
            </Typography>
          ))}
        </Container>
      </Container>
    </>
  );
};

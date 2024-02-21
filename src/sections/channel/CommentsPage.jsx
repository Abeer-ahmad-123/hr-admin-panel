/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import { red } from '@mui/material/colors';
import { Container } from '@mui/material';
import DeleteComment from './DeleteComment';

const CommentsPage = ({ post, id, commentsData }) => {
  const [comments, setComments] = useState(commentsData?.comments);
  const [clicked, setClicked] = useState(false);
  const [commentIdToDelete, setCommentIdToDelete] = useState(null);

  const DeleteCommentClick = (e) => {
    setClicked(!clicked);
    setCommentIdToDelete(e.target.id);
  };

  useEffect(() => {
    setComments(commentsData?.comments);
  }, [id]);

  return (
    <>
      {comments?.map((data) => (
        <div key={data?.id}>
          <Container sx={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
            <Avatar aria-label="recipe" src={post?.author_details?.profile_picture_url} alt={id} />

            <Container
              sx={{
                position: 'relative',
                backgroundColor: 'RGB(241, 245, 249)',
                borderRadius: '20px',
                width: 'fit-content',
                maxWidth: '30vw',
                height: 'auto',
                padding: '15px',
                margin: '0px',
              }}
            >
              <Typography color="#571CE1">{post?.author_details?.name}</Typography>
              <Typography style={{ wordWrap: 'break-word' }} color="#4B5563">
                {data?.content}
              </Typography>
              <Box
                id={data?.id}
                onClick={DeleteCommentClick}
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  position: 'absolute',
                  top: '10px',
                  right: '-7rem',
                  zIndex: '2',
                  backgroundColor: '#db0f24',
                  width: '6rem',
                  height: '2rem',
                  cursor: 'pointer',
                  '&:hover': {
                    boxShadow: '0px 0px 10px 5px rgba(255, 0, 0, 0.8)',
                  },
                }}
                borderRadius="5px"
              >
                <Typography
                  style={{ color: 'white', textAlign: 'center' }}
                  id={data?.id}
                  onClick={DeleteCommentClick}
                >
                  delete
                </Typography>
              </Box>
            </Container>
          </Container>
          <Container>
            {data?.replies?.map((reply) => (
              <Container
                key={reply?.id}
                sx={{
                  width: 'auto',
                  height: 'auto',
                  display: data?.total_replies === 0 ? 'none' : 'flex',
                  gap: '10px',
                  marginLeft: '60px',
                  marginTop: '30px',
                  marginBottom: '30px',
                }}
              >
                <Avatar
                  sx={{ bgcolor: red[500] }}
                  aria-label="recipe"
                  src={post?.author_details?.profile_picture_url}
                  alt={id}
                />

                <Container
                  sx={{
                    position: 'relative',
                    width: 'fit-content',
                    maxWidth: '30vw',
                    backgroundColor: 'RGB(241, 245, 249)',
                    borderRadius: '20px',
                    padding: '15px',
                    marginLeft: '0px',
                  }}
                >
                  <Typography color="#571CE1">{post?.author_details?.name}</Typography>

                  <div key={reply?.id}>
                    <Typography key={reply?.id} color="#4B5563">
                      {reply.content}
                    </Typography>

                    <Stack
                      id={reply?.id}
                      onClick={DeleteCommentClick}
                      sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        position: 'absolute',
                        top: '10px',
                        right: '-7rem',
                        zIndex: '2',
                        backgroundColor: '#db0f24',
                        width: '6rem',
                        height: '2rem',
                        cursor: 'pointer',
                        '&:hover': {
                          boxShadow: '0px 0px 10px 5px rgba(255, 0, 0, 0.8)',
                        },
                      }}
                      borderRadius="5px"
                    >
                      <Typography
                        style={{ color: 'white', textAlign: 'center' }}
                        id={data?.id}
                        onClick={DeleteCommentClick}
                        // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
                      >
                        delete
                      </Typography>
                    </Stack>
                  </div>
                </Container>
              </Container>
            ))}
          </Container>
        </div>
      ))}{' '}
      {commentsData?.comments?.length === 0 && (
        <Typography
          sx={{
            textAlign: 'center',
            textTransform: 'capitalize',
          }}
          variant="h4"
        >
          No comments from This Post
        </Typography>
      )}
      <DeleteComment clicked={clicked} setClicked={setClicked} id={commentIdToDelete} />
    </>
  );
};

export default CommentsPage;

CommentsPage.propTypes = {
  post: PropTypes.object,
  id: PropTypes.any,
  commentsData: PropTypes.any,
};

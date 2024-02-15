import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Stack from '@mui/material/Stack';
import Iconify from 'src/components/iconify';

import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import { Container } from '@mui/material';
import DeleteComment from './DeleteComment';

const CommentsPage = ({ post, id, commentsData }) => {
  const [comments, setComments] = useState(commentsData?.comments);
  const [clicked, setClicked] = useState(false);
  const [commentIdToDelete, setCommentIdToDelete] = useState(null);

  const DeleteCommentClick = (Comment_id) => {
    setClicked(!clicked);
    setCommentIdToDelete(Comment_id);
  };

  useEffect(() => {
    setComments(commentsData?.comments);
    // eslint-disable-next-line
  }, [id]);

  return (
    <>
      {comments?.map((data) => (
        <div key={data?.id}>
          <Container style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
            <Avatar aria-label="recipe" src={post?.author_details?.profile_picture_url}>
              {id}
            </Avatar>
            <Container
              style={{
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
              <Stack
                id={data?.id}
                onClick={() => DeleteCommentClick(data?.id)}
                sx={{
                  position: 'absolute',
                  top: '10px',
                  right: '-2.5rem',
                  zIndex: '2',
                  backgroundColor: '#db0f24',
                  width: '2rem',
                  height: '2rem',
                  cursor: 'pointer',
                  '&:hover': {
                    boxShadow: '0px 0px 10px 5px rgba(255, 0, 0, 0.8)',
                  },
                }}
                direction="row"
                alignItems="center"
                justifyContent="center"
                borderRadius="30px"
              >
                <Iconify
                  id="1"
                  icon="material-symbols:delete"
                  sx={{
                    color: 'white',
                    '&:hover': {
                      width: '1.4rem',
                      height: '1.4rem',
                    },
                  }}
                />
              </Stack>
            </Container>
          </Container>
          <Container>
            {data?.replies?.map((reply) => (
              <Container
                key={reply?.id}
                style={{
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
                  src={post?.author_details?.profile_picture_url}
                >
                  {id}
                </Avatar>
                <Container
                  style={{
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
                      id="1"
                      onClick={() => DeleteCommentClick(reply?.id)}
                      sx={{
                        position: 'absolute',
                        top: '10px',
                        right: '-2.5rem',
                        zIndex: '2',
                        backgroundColor: '#db0f24',
                        width: '2rem',
                        height: '2rem',
                        cursor: 'pointer',
                        '&:hover': {
                          boxShadow: '0px 0px 10px 5px rgba(255, 0, 0, 0.8)',
                        },
                      }}
                      direction="row"
                      alignItems="center"
                      justifyContent="center"
                      borderRadius="30px"
                    >
                      <Iconify
                        id="1"
                        icon="material-symbols:delete"
                        sx={{
                          color: 'white',
                          '&:hover': {
                            width: '1.4rem',
                            height: '1.4rem',
                          },
                        }}
                      />
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

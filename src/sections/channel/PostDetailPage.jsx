import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import { Container } from '@mui/material';
import { useAuth } from 'src/hooks/interceptors';
import { useDispatch, useSelector } from 'react-redux';
import { PostsByUserId } from 'src/redux-toolkit/actions/channelAction';
import { PulseLoader } from 'react-spinners';
import { useInView } from 'react-intersection-observer';

const PostDetailPage = () => {
  const [loading, setLoading] = useState(true);
  const [postDetails, setPostDetails] = useState([]);
  const [page, setPage] = useState(1);
  const [ref, inView] = useInView();
  const { id } = useParams();
  const { setupApiInterceptor } = useAuth();
  const dispatch = useDispatch();
  const { posts, pagination } = useSelector((state) => state.channels?.channels);

  const paginationFn = () => {
    if (page !== pagination?.TotalPages) {
      dispatch(PostsByUserId({ setupApiInterceptor, id, page }));
    }
  };
  const appendPostsDetails = () => {
    setPostDetails((prevDetails) => ({
      ...prevDetails,
      posts: [...(prevDetails?.posts || []), ...(posts || [])],
    }));

    setLoading(false);
  };

  useEffect(() => {
    paginationFn();

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

  const options = { month: 'short', day: 'numeric', year: 'numeric' };
  const formatDate = (dateString) => {
    const formattedDate = new Date(dateString).toLocaleDateString('en-US', options);
    const day = new Intl.DateTimeFormat('en', { day: 'numeric' }).format(new Date(dateString));
    const dayWithOrdinal = day + (/[0,4-9]/.test(day) ? 'th' : ['st', 'nd', 'rd'][(day % 10) - 1]);
    return formattedDate.replace(day, dayWithOrdinal);
  };
  console.log(postDetails.posts);
  return (
    <Stack>
      {loading && <Stack> loading...</Stack>}
      {!loading &&
        postDetails?.posts?.map((data) => (
          <Card key={data?.id} sx={{ maxWidth: '100vw', marginBottom: '20px' }}>
            <CardHeader
              avatar={
                <Avatar
                  sx={{ bgcolor: red[500] }}
                  aria-label="recipe"
                  src={data.author_details?.profile_picture_url}
                /> // Use src attribute to assign the imported image
              }
              title={data.author_details.name}
              subheader={`${'created at'} ${formatDate(data?.created_at)}`}
            />
            {data.image_url ? (
              <CardMedia
                component="img"
                height="194"
                image={data.image_url}
                alt=""
                sx={{ width: 'auto', objectFit: 'fill', padding: '20px' }}
              />
            ) : (
              <>
                <Typography sx={{ padding: '20px 20px 0px 20px' }} variant="h4">
                  {data.title}{' '}
                </Typography>
                <Typography sx={{ padding: '20px 20px 0px 20px' }}>{data.content} </Typography>
              </>
            )}
            <CardContent>
              <hr />
              <Container style={{ display: 'flex', gap: '10px' }}>
                <Avatar
                  sx={{ bgcolor: red[500] }}
                  aria-label="recipe"
                  src={data?.author_details?.profile_picture_url}
                >
                  {id}
                </Avatar>
                <Container
                  style={{
                    backgroundColor: 'RGB(241, 245, 249)',
                    borderRadius: '20px',
                    width: 'auto',
                    height: 'auto',
                    padding: '15px',
                    margin: '0px',
                  }}
                >
                  <Typography color="#571CE1">{data.author_details?.name}</Typography>
                  <Typography color="#4B5563">total Comment: {data?.total_comments}</Typography>
                </Container>
              </Container>
              {/* change to sx */}
              <Container
                style={{
                  width: 'auto',
                  height: 'auto',
                  display: 'flex',
                  gap: '10px',
                  marginLeft: '60px',
                  marginTop: '30px',
                }}
              >
                <Avatar
                  sx={{ bgcolor: red[500] }}
                  aria-label="recipe"
                  src={data?.author_details?.profile_picture_url}
                >
                  {id}
                </Avatar>
                <Container
                  style={{
                    width: 'auto',
                    backgroundColor: 'RGB(241, 245, 249)',
                    borderRadius: '20px',
                    padding: '15px',
                    marginLeft: '0px',
                  }}
                >
                  <Typography color="#571CE1">{data?.author_details?.name}</Typography>
                  <Typography color="#4B5563">total Comment: {data?.total_comments}</Typography>
                </Container>
              </Container>
            </CardContent>
          </Card>
        ))}
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
    </Stack>
  );
};

export default PostDetailPage;

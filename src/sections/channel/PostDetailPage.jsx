import React from 'react';
import { useParams } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader'; // Import CardHeader
import CardMedia from '@mui/material/CardMedia'; // Import CardMedia
import Avatar from '@mui/material/Avatar'; // Import Avatar
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import { Container } from '@mui/material';
import avatar from '../../../public/assets/images/avatars/avatar_9.jpg';

const PostDetailPage = () => {
  const { postId } = useParams(); // Get channel and post IDs from URL parameters

  return (
    <Card sx={{ maxWidth: 1000 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe" src={avatar} /> // Use src attribute to assign the imported image
        }
        title="Dawood Israr"
        subheader="September 14, 2016"
      />
      <CardMedia
        component="img"
        height="194"
        image={avatar}
        alt="Paella dish"
        sx={{ width: 'auto', objectFit: 'fill', padding: '20px' }}
      />
      <CardContent>
        <hr />
        <Container style={{ display: 'flex', gap: '10px' }}>
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe" src={avatar}>
            {postId}
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
            <Typography color="#571CE1">Dawood israr</Typography>
            <Typography color="#4B5563">Comment</Typography>
          </Container>
        </Container>

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
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe" src={avatar}>
            {postId}
          </Avatar>
          <Container
            style={{
              width: 'auto',
              backgroundColor: 'RGB(241, 245, 249)',
              borderRadius: '20px',
              padding: '15px',
              marginLeft: '0px',
              //   marginRight: '46px',
            }}
            xs
          >
            <Typography color="#571CE1">dawood israr</Typography>
            <Typography color="#4B5563">Lorem ipsum dolor sit,</Typography>
          </Container>
        </Container>
      </CardContent>
    </Card>
  );
};

export default PostDetailPage;

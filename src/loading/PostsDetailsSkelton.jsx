import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import Skeleton from '@mui/material/Skeleton';

const PostsDetailsSkelton = () => (
  <Card sx={{ maxWidth: '100vw', marginBottom: '20px' }}>
    <Stack
      sx={{
        padding: '25px 25px 0px 25px',
      }}
    >
      <Stack direction="row" gap="10px">
        <Skeleton animation="wave" variant="circular" width={40} height={40} />
        <Stack>
          <Skeleton width={150} height={30} />
          <Skeleton width={150} height={20} />
        </Stack>
      </Stack>
    </Stack>

    <Stack
      sx={{
        paddingX: '25px',
      }}
    >
      <Skeleton height={194} width={270} />
    </Stack>
    <CardContent>
      <hr />
      <Stack
        sx={{
          padding: '0px 20px 20px 20px',
        }}
      >
        <Stack direction="row" gap="5px">
          <Skeleton animation="wave" variant="circular" width={40} height={40} />
          <Skeleton width={170} height={120} />
        </Stack>

        <Stack
          direction="row"
          gap="5px"
          sx={{
            paddingLeft: '40px',
          }}
        >
          <Skeleton animation="wave" variant="circular" width={40} height={40} />
          <Skeleton width={170} height={120} />
        </Stack>
      </Stack>
    </CardContent>
  </Card>
);

export default PostsDetailsSkelton;

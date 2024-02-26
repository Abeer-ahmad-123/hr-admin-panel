import React from 'react';
import Skeleton from '@mui/material/Skeleton';

import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';

const DashboardSkelton = () => (
  <Container maxWidth="xl">
    <Skeleton width={380} />
    <Grid container spacing={3} ml={1}>
      <Grid xs={12} sm={6} md={3}>
        <Skeleton sx={{ width: '240px', height: '220px' }} />
      </Grid>

      <Grid xs={12} sm={6} md={3}>
        <Skeleton sx={{ width: '240px', height: '220px' }} />
      </Grid>

      <Grid xs={12} sm={6} md={3}>
        <Skeleton sx={{ width: '240px', height: '220px' }} />
      </Grid>

      <Grid xs={12} sm={6} md={3}>
        <Skeleton sx={{ width: '240px', height: '220px' }} />
      </Grid>

      <Grid xs={12} md={6} lg={8}>
        <Skeleton sx={{ width: '45rem', height: '50rem', margin: 0, marginTop: '-12rem' }} />
      </Grid>

      <Grid xs={12} md={6} lg={4}>
        <Skeleton sx={{ width: '22rem', height: '50rem', marginTop: '-12rem' }} />{' '}
      </Grid>
    </Grid>
  </Container>
);

export default DashboardSkelton;

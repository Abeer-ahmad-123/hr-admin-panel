import React from 'react';
import Stack from '@mui/material/Stack';
import Skeleton from '@mui/material/Skeleton';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';

const ChannelSkelton = () => (
  <>
    {' '}
    <Card>
      <Box sx={{ mt: '-7rem', position: 'relative' }}>
        <Skeleton width="100%" height="30rem" />
      </Box>

      <Stack spacing={2} sx={{ pt: 0, pr: 3, pb: 3, pl: 3 }}>
        <Stack direction="row" justifyContent="center">
          <Skeleton width="50%" height="3rem" />
        </Stack>

        <Stack direction="row" justifyContent="space-between">
          <Skeleton width="20%" height="2rem" />
          <Skeleton width="20%" height="2rem" />
        </Stack>
      </Stack>
    </Card>
  </>
);

export default ChannelSkelton;

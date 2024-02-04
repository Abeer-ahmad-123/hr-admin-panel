import { useState } from 'react';
import { useSelector } from 'react-redux';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import ChannelSkelton from 'src/loading/channelSkelton';
import Iconify from 'src/components/iconify';
import ChannelCard from '../Channel-card';
import AddChannel from '../AddChannel';

const ChannelView = () => {
  const { channels, loading } = useSelector((state) => state.channels);

  const [clicked, setClicked] = useState(false);

  const addChannel = () => {
    setClicked(true);
  };

  return (
    <Container>
      <AddChannel clicked={clicked} setClicked={setClicked} />
      <Stack direction="row" justifyContent="space-between">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Channel
        </Typography>
        <Button sx={newButton} onClick={addChannel}>
          <Iconify icon="material-symbols:add" sx={{ mr: 2 }} /> New Channel
        </Button>
      </Stack>
      {loading ? (
        <Grid container spacing={5}>
          {Array.from({ length: 8 }).map((_, index) => (
            <Grid key={index} xs={12} sm={6} md={4}>
              <ChannelSkelton />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Grid container spacing={5}>
          {channels.channels?.map((channel) => (
            <Grid key={channel.id} xs={12} sm={6} md={4}>
              <ChannelCard channel={channel} />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default ChannelView;
const newButton = {
  backgroundColor: '#571CE0',
  color: 'white',

  height: '3rem',
  '&:hover': {
    backgroundColor: '#571CE0',
  },
};

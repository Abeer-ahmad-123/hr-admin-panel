/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { labels, series } from 'src/components/Constants';
import { useDispatch, useSelector } from 'react-redux';
import { getDashboardData } from 'src/redux-toolkit/actions/DashBoardAction';
import { useAuth } from 'src/hooks/interceptors';
import DashboardSkelton from 'src/loading/DashboardSkelton';
import AppCurrentVisits from '../app-current-visits';
import AppWidgetSummary from '../app-widget-summary';
import AppWebsiteVisits from '../app-website-visits';

export default function AppView() {
  const { name } = useSelector((state) => state.auth?.admindata);
  const authToken = useSelector((state) => state?.auth?.accessToken);
  const { dashboardData, loading } = useSelector((state) => state?.dashboard);

  const { setupApiInterceptor } = useAuth();
  const disaptch = useDispatch();

  useEffect(() => {
    disaptch(getDashboardData({ setupApiInterceptor, authToken }));
  }, []);
  const seriesData = [
    { label: 'TotalUsers', value: dashboardData?.totalUsers },
    { label: 'TotalChannels', value: dashboardData?.totalChannels },
    { label: 'Reported Posts Till Now', value: dashboardData?.totalReportedPosts },
  ];

  return (
    <>
      {loading ? (
        <Typography variant="h4" sx={{ mb: 5 }}>
          <DashboardSkelton />
        </Typography>
      ) : (
        <Container maxWidth="xl">
          <Typography variant="h4" sx={{ mb: 5 }}>
            Hi
            <span
              style={{
                color: '#5141df',
              }}
            >
              &nbsp;{name}
            </span>
            , Welcome back <span> 👋 </span>
          </Typography>

          <Grid container spacing={3}>
            <Grid xs={12} sm={6} md={3}>
              <AppWidgetSummary
                title="Total Users"
                total={dashboardData?.totalUsers}
                color="info"
                icon={<img alt="icon" src="/assets/icons/glass/ic_glass_users.png" />}
              />
            </Grid>

            <Grid xs={12} sm={6} md={3}>
              <AppWidgetSummary
                title="total Posts"
                total={dashboardData?.totalPosts}
                color="success"
                icon={<img alt="icon" src="/assets/icons/glass/ic_glass_message.jpeg" />}
              />
            </Grid>

            <Grid xs={12} sm={6} md={3}>
              <AppWidgetSummary
                title=" Reported Posts"
                total={dashboardData?.totalReportedPosts}
                color="warning"
                icon={<img alt="icon" src="/assets/icons/glass/ic_glass_select.jpeg" />}
              />
            </Grid>

            <Grid xs={12} sm={6} md={3}>
              <AppWidgetSummary
                title="Total Channels"
                total={dashboardData?.totalChannels}
                color="error"
                icon={<img alt="icon" src="/assets/icons/glass/ic_glass_document.jpeg" />}
              />
            </Grid>

            <Grid xs={12} md={6} lg={8} sx={{ position: 'relative' }}>
              <Box sx={layeredDesign}>
                <Typography variant="h6" color="white" className="hoverText" sx={contentDesign}>
                  Content Coming Soon...
                </Typography>
              </Box>
              <AppWebsiteVisits
                title="Stats graphical Chart"
                subheader="loading"
                chart={{
                  labels,
                  series,
                }}
              />
            </Grid>

            <Grid xs={12} md={6} lg={4}>
              <AppCurrentVisits
                title="stats Pie Chart"
                chart={{
                  series: seriesData,
                }}
              />
            </Grid>
          </Grid>
        </Container>
      )}
    </>
  );
}

const contentDesign = {
  display: 'none',
  fontSize: 120,
};

const layeredDesign = {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.75)',
  zIndex: 1,
  borderRadius: '20px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'background-color 0.3s ease',

  '&:hover': {
    '& > .hoverText': {
      display: 'block',
    },
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    cursor: 'pointer',
  },
};

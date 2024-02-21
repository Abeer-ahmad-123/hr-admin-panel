/* eslint-disable react-hooks/exhaustive-deps */

import Container from '@mui/material/Container';
import React, { useEffect } from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import { useDispatch, useSelector } from 'react-redux';
import { getDashboardData } from 'src/redux-toolkit/actions/DashBoardAction';
import { useAuth } from 'src/hooks/interceptors';
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

  return (
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
      {loading ? (
        <Typography variant="h4" sx={{ mb: 5 }}>
          its loading! wait...
        </Typography>
      ) : (
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
              icon={<img alt="icon" src="/assets/icons/glass/Message.jpeg" />}
            />
          </Grid>

          <Tooltip
            title={`reported Comments: ${dashboardData?.totalReportedComments}`}
            placement="top"
            sx={{
              backgroundColor: 'white',
              color: 'black',
            }}
          >
            <Grid
              sx={{
                display: 'flex',
                cursor: 'pointer',
              }}
              xs={12}
              sm={6}
              md={3}
            >
              <AppWidgetSummary
                title=" Reported Posts"
                total={dashboardData?.totalReportedPosts}
                color="warning"
                icon={<img alt="icon" src="/assets/icons/glass/Select.jpeg" />}
              />
            </Grid>
          </Tooltip>

          <Grid xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title="Total Channels"
              total={dashboardData?.totalChannels}
              color="error"
              icon={<img alt="icon" src="/assets/icons/glass/Add  documents.jpeg" />}
            />
          </Grid>

          <Grid xs={12} md={6} lg={8} sx={{ position: 'relative' }}>
            <div
              style={{
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
              }}
            >
              <Typography variant="h6" color="white">
                Content Coming Soon...
              </Typography>
            </div>
            <AppWebsiteVisits
              title="Stats graphical Chart"
              subheader="loading"
              chart={{
                labels: [
                  '01/01/2003',
                  '02/01/2003',
                  '03/01/2003',
                  '04/01/2003',
                  '05/01/2003',
                  '06/01/2003',
                  '07/01/2003',
                  '08/01/2003',
                  '09/01/2003',
                  '10/01/2003',
                  '11/01/2003',
                ],
                series: [
                  {
                    name: 'Users',
                    type: 'column',
                    fill: 'solid',
                    data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30],
                  },
                  {
                    name: 'Channels',
                    type: 'area',
                    fill: 'gradient',
                    data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43],
                  },
                  {
                    name: 'Reported Data',
                    type: 'line',
                    fill: 'solid',
                    data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39],
                  },
                ],
              }}
            />
          </Grid>

          <Grid xs={12} md={6} lg={4}>
            <AppCurrentVisits
              title="stats Pie Chart"
              chart={{
                series: [
                  { label: 'TotalUsers', value: dashboardData?.totalUsers },
                  { label: 'TotalChannels', value: dashboardData?.totalChannels },
                  { label: 'Reported Posts Till Now', value: dashboardData?.totalReportedPosts },
                ],
              }}
            />
          </Grid>
        </Grid>
      )}
    </Container>
  );
}

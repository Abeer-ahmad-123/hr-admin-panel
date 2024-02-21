/* eslint-disable perfectionist/sort-imports */
/* eslint-disable react-hooks/exhaustive-deps */
import 'src/global.css';

import { useScrollToTop } from 'src/hooks/use-scroll-to-top';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Router from 'src/routes/sections';
import { useLocation, useNavigate } from 'react-router-dom';
import ThemeProvider from 'src/theme';
import expiredTokenFn from './redux-toolkit/actions/refreshTokenFn';
import { refreshTokenFn } from './redux-toolkit/actions/loginActions';
import { clearAuth } from './redux-toolkit/reducers/loginReducer';
import { allChannels } from './redux-toolkit/actions/channelAction';
import { useAuth } from './hooks/interceptors';

const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authToken = useSelector((state) => state.auth?.accessToken);
  const refreshToken = useSelector((state) => state.auth?.refreshToken);
  const { channels } = useSelector((state) => state.channels);
  const [, setCheckStatus] = useState(channels.requestStatus);
  const { pathname } = useLocation();

  const { setupApiInterceptor } = useAuth();
  const expiredToken = async () => {
    try {
      const result = await dispatch(expiredTokenFn(authToken));

      if (result?.error?.code) {
        throw result;
      }
    } catch (error) {
      try {
        const res = await dispatch(refreshTokenFn(refreshToken));
        if (res?.error?.code) {
          throw res;
        }
      } catch {
        dispatch(clearAuth());
        navigate('/login');
      }
    }
  };

  useEffect(() => {
    setCheckStatus(channels.requestStatus);
  }, [channels.requestStatus]);

  useEffect(() => {
    if (authToken) {
      if (pathname === '/') {
        expiredToken();
      }
      if (!channels.length) {
        dispatch(allChannels(setupApiInterceptor));
      }
    }
  }, [authToken, channels?.requestStatus]);

  useScrollToTop();

  return (
    <ThemeProvider>
      <Router />
    </ThemeProvider>
  );
};
export default App;

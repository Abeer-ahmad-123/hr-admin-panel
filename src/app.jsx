/* eslint-disable perfectionist/sort-imports */
import 'src/global.css';

import { useScrollToTop } from 'src/hooks/use-scroll-to-top';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Router from 'src/routes/sections';
import { useNavigate } from 'react-router-dom';
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

  const { setupApiInterceptor } = useAuth();
  const expiredToken = async () => {
    try {
      const result = await dispatch(expiredTokenFn(authToken));

      if (result?.error?.code) {
        throw result;
      }
    } catch (error) {
      try {
        const res = dispatch(refreshTokenFn(refreshToken));

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
    dispatch(allChannels(setupApiInterceptor));
    setCheckStatus(channels.requestStatus);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [channels.requestStatus]);
  useEffect(() => {
    if (authToken) expiredToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authToken]);

  useScrollToTop();

  return (
    <ThemeProvider>
      <Router />
    </ThemeProvider>
  );
};
export default App;

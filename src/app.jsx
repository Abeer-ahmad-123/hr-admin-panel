/* eslint-disable perfectionist/sort-imports */
/* eslint-disable react-hooks/exhaustive-deps */
import 'src/global.css';

import { useScrollToTop } from 'src/hooks/use-scroll-to-top';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Router from 'src/routes/sections';

import ThemeProvider from 'src/theme';

const App = () => {
  const { channels } = useSelector((state) => state.channels);
  const [, setCheckStatus] = useState(channels.requestStatus);

  useEffect(() => {
    setCheckStatus(channels.requestStatus);
  }, [channels.requestStatus]);

  // useEffect(() => {

  // }, []);
  useScrollToTop();

  return (
    <ThemeProvider>
      <Router />
    </ThemeProvider>
  );
};
export default App;

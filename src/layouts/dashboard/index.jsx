import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import axios from 'axios';
import PropTypes from 'prop-types';
import { ToastContainer } from 'react-toastify';
import { refreshToken } from 'src/redux-toolkit/actions/loginActions';
import 'react-toastify/dist/ReactToastify.css';
import Box from '@mui/material/Box';
import Nav from './nav';
import Main from './main';
import Header from './header';

export default function DashboardLayout({ children }) {
  const [openNav, setOpenNav] = useState(false);
  const dispatch = useDispatch();
  const currentToken = useSelector((state) => state.auth?.token);
  console.log('current token', currentToken);
  const refreshTokens = useSelector((state) => state.auth.refreshToken);
  console.log('current token', refreshTokens);
  const checkToken = () => {
    dispatch(refreshToken({ token: currentToken, refreshToken: refreshTokens }));
  };

  useEffect(() => {
    checkToken();
  });
  return (
    <>
      <Header onOpenNav={() => setOpenNav(true)} />

      <Box
        sx={{
          minHeight: 1,
          display: 'flex',
          flexDirection: { xs: 'column', lg: 'row' },
        }}
      >
        <Nav openNav={openNav} onCloseNav={() => setOpenNav(false)} />

        <Main>{children}</Main>
        <ToastContainer />
      </Box>
    </>
  );
}

DashboardLayout.propTypes = {
  children: PropTypes.node,
};

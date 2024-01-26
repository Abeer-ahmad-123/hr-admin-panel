import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import { clearAuth } from 'src/redux-toolkit/reducers/loginReducer';
import { getUserDetails } from 'src/redux-toolkit/actions/loginActions';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import { showErrorAlert } from 'src/utils/helper/toast';
import Box from '@mui/material/Box';
import Nav from './nav';
import Main from './main';
import Header from './header';

export default function DashboardLayout({ children }) {
  const [openNav, setOpenNav] = useState(false);
  const token = localStorage.getItem('token');
  const dispatch = useDispatch();
  // const navigate = useNavigate();
  const currentUser = useSelector((state) => state.auth.userData.userData);
  console.log('data from store', currentUser);

  // const handleLogout = () => {
  //   localStorage.removeItem('token');
  //   localStorage.removeItem('refresh-token');
  //   dispatch(clearAuth());
  //   navigate('/login');
  //   showErrorAlert('Session Expired! Please login again.');
  // };

  const getUserDetail = async () => {
    try {
      const res = await dispatch(getUserDetails(token));
      console.log('data from response', res);
      if (res.error) {
        // handleLogout();
      }
    } catch (error) {
      // handleLogout();
    }
  };

  useEffect(() => {
    getUserDetail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const ProtectedRoute = ({children}) => {
  const navigate = useNavigate();
 
  const isAuthenticated = localStorage.getItem('access-token');
   
    useEffect(() => {
      if (!isAuthenticated) {
        navigate('/login');
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isAuthenticated]);

    return (
    <>
      {children}
    </>
    )
};
ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired, 
};
export default ProtectedRoute;

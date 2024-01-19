import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ProtectedRoute = ({children}) => {
  const navigate = useNavigate();
 
  const isAuthenticated = localStorage.getItem('access-token');
   
    useEffect(() => {
      if (!isAuthenticated) {
        navigate('/login');
      }
    }, [isAuthenticated, navigate]);

    return (
    <>
      {children}
    </>
    )
};

export default ProtectedRoute;

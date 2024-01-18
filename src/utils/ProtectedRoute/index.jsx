import React from 'react';
import { useNavigate } from 'react-router-dom';

const ProtectedRoute = ({children}) => {
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem('access-token');
  console.log(isAuthenticated);
    if (!isAuthenticated) {
      setTimeout(()=>{
        navigate('/login');
      },1)
    }
    return (
    <>
      {children}
    </>
    )
};

export default ProtectedRoute;

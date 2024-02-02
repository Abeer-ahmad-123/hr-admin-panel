import { useDispatch, useSelector } from 'react-redux';
import { refreshTokenFn } from 'src/redux-toolkit/actions/loginActions';
import { clearAuth } from 'src/redux-toolkit/reducers/loginReducer';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL;
export const useAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const refreshToken = useSelector((state) => state.auth.refreshToken);

  const setupApiInterceptor = async (urlPath, method, data = {}, headers) => {
    try {
      const fullUrl = `${BASE_URL}${urlPath}`;
      const response = await axios({
        method,
        url: fullUrl,
        headers,
        data,
      });

      return response?.data?.data;
    } catch (error) {
      /* eslint-disable */
      if (error.response && error.response.status === 401) {
        dispatch(refreshTokenFn(refreshToken));
      } else {
        dispatch(clearAuth());
        navigate('/login');
        ///// clear auth if token expires and navigate to login
        throw error;
      }
    }
    return '';
  };
  return {
    setupApiInterceptor,
  };
};

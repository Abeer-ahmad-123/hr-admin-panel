import axios from 'axios';
import { useSelector } from 'react-redux';

const BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL;

const SetupApiInterceptor = async (urlPath, method, data = {}, headers) => {
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
      const refreshTokens = useSelector((state) => state.auth?.admindata?.['refresh-token']);

      if (refreshTokens) {
        try {
          const refreshResponse = await axios.post(
            `${BASE_URL}/auth/refreshToken`,
            'POST',

            {
              headers: { refreshTokens },
            }
          );
          const updatedToken = response?.data?.token;

          updatedToken = refreshResponse?.data?.token;

          // Create a new object with updated headers
          const updatedHeaders = {
            ...headers,
            Authorization: `Bearer ${updatedToken}`,
          };

          return SetupApiInterceptor(urlPath, method, data, updatedHeaders);
        } catch (refreshError) {
          throw refreshError;
        }
      } else {
        throw error;
      }
    } else {
      throw error;
    }
  }
};

export default SetupApiInterceptor;

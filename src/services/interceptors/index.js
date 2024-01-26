import axios from 'axios';

const BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL;

const setupApiInterceptor = async (urlPath, method, data = {}, headers) => {
  try {
    const fullUrl = `${BASE_URL}${urlPath}`;
    const response = await axios({
      method,
      url: fullUrl,
      headers,
      data,
    });
    return response.data.data;
  } catch (error) {
    /* eslint-disable */
    if (error.response && error.response.status === 401) {
      const refreshToken = localStorage.getItem('refresh-token');
      if (refreshToken) {
        try {
          const refreshResponse = await axios.post(
            `${BASE_URL}/auth/refreshToken`,
            {},
            {
              headers: { refreshToken },
            }
          );
          localStorage.setItem('token', refreshResponse?.data?.token);

          // Create a new object with updated headers
          const updatedHeaders = {
            ...headers,
            Authorization: `Bearer ${refreshResponse?.data?.token}`,
          };

          return setupApiInterceptor(urlPath, method, data, updatedHeaders);
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

export default setupApiInterceptor;

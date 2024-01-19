import axios from 'axios';

const BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL;

const setupApiInterceptor = async (urlPath, headers, data = {}, method) => {
  // Make the API request synchronously (not using await)
  try {
    // Make the API request synchronously (using await)
    const fullUrl = `${BASE_URL}${urlPath}`;
    const response = await axios({
      method,
      url: fullUrl,
      headers,
      data,
    });

    console.log('API response:', response.data);

    return response.data.data;
  } catch (error) {
    console.log('API error:', error);

    if (error.response && error.response.status === 401) {
      console.log('`12`12`12`1`');
      const refreshToken = localStorage.getItem('refresh-token');
      if (refreshToken) {
        console.log('12123131321321');
        try {
          const refreshResponse = await axios.post('/auth/refreshToken', {
            RefreshToken: refreshToken,
          });

          localStorage.setItem('access-token', refreshResponse.data.data.token);

          console.log('Access Token:', refreshResponse?.data?.data?.token);

          // Create a new object with updated headers
          const updatedHeaders = {
            ...headers,
            Authorization: `Bearer ${refreshResponse?.data?.data?.token}`,
          };

          // Recursive call to setupApiInterceptor with updated headers

          return setupApiInterceptor(urlPath, updatedHeaders, data, method);
        } catch (refreshError) {
          console.error('Error refreshing token:', refreshError);
          throw refreshError;
        }
      } else {
        console.log('23424324324334');
        throw error;
      }
    } else {
      console.log('testing 12312312');
      throw error;
    }
  }
};

export default setupApiInterceptor;

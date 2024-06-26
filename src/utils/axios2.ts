// TODO: delete file
import axios from 'axios';
import createAuthRefreshInterceptor from 'axios-auth-refresh';

// Function that will be called to refresh authorization
const refreshAuthLogic = (failedRequest) => {
  return axios.post('https://www.example.com/auth/token/refresh')
    .then((tokenRefreshResponse) => {
      localStorage.setItem('token', tokenRefreshResponse.data.token);
      failedRequest.response.config.headers['Authorization'] = 'Bearer ' + tokenRefreshResponse.data.token;
      return Promise.resolve();
    });
};

// Instantiate the interceptor
createAuthRefreshInterceptor(axios, refreshAuthLogic);
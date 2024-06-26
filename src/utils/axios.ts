// TODO: delete file
import axios from 'axios';
import createAuthRefreshInterceptor from 'axios-auth-refresh';
import store from '../store';
import authSlice from '../store/slices/auth';

const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
const axiosService = axios.create({
  baseURL: apiUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosService.interceptors.request.use(async (config) => {
  const { token } = store.getState().auth;

  if (token !== null) {
    config.headers.Authorization = 'Bearer ' + token;
    // @ts-ignore
    console.debug(
      '[Request]',
      config.baseURL + config.url,
      JSON.stringify(token)
    );
  }
  return config;
});

axiosService.interceptors.response.use(
  (res) => {
    // @ts-ignore
    console.debug(
      '[Response]',
      res.config.baseURL + res.config.url,
      res.status,
      res.data
    );
    return Promise.resolve(res);
  },
  (err) => {
    console.debug(
      '[Response]',
      err.config.baseURL + err.config.url,
      err.response.status,
      err.response.data
    );
    return Promise.reject(err);
  }
);

// TODO: test refresh token
// @ts-ignore
const refreshAuthLogic = async (failedRequest) => {
  const { refreshToken } = store.getState().auth;
  if (refreshToken !== null) {
    return axios
      .post(
        '/auth/refresh/',
        {
          refresh: refreshToken,
        },
        {
          baseURL: apiUrl,
        }
      )
      .then((resp) => {
        const { access, refresh } = resp.data;
        failedRequest.response.config.headers.Authorization =
          'Bearer ' + access;
        store.dispatch(
          authSlice.actions.setAuthTokens({
            token: access,
            refreshToken: refresh,
          })
        );
      })
      .catch((err) => {
        if (err.response && err.response.status === 401) {
          // TODO: does it handle logout properly?
          store.dispatch(authSlice.actions.setLogout());
        }
      });
  }
};

createAuthRefreshInterceptor(axiosService, refreshAuthLogic);

export function fetcher<T = any>(url: string) {
  return axiosService.get<T>(url).then((res) => res.data);
}

export default axiosService;

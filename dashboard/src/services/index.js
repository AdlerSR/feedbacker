import axios from 'axios';
import AuthService from './auth';

const API_ENVS = {
  production: '',
  local: 'http://localhost:3000',
};

const httpClient = axios.create({
  baseUrl: API_ENVS.local,
});

httpClient.interceptors.response.use(
  response => response,
  error => {
    const canThrowError =
      error.request.status === 0 || error.request.status === 500;

    if (canThrowError) {
      throw new Error(error.message);
    }

    return error;
  },
);

export default {
  auth: AuthService(httpClient),
};

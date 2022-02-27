import Axios from 'axios';
import { getToken } from './helper';

// http://260z5v3152.wicp.vip/
// baseURL: 'http://114.55.146.92:8888/exam',

// const req = Axios.create({
//   baseURL: ' http://260z5v3152.wicp.vip/exam',
// });

const req = Axios.create({
  baseURL: ' http://localhost:8080',
});

req.interceptors.request.use(config => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `${token}`;
  }
  return config;
}, err => Promise.reject(err))

export default req;

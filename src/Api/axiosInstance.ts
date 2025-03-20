import axios, {InternalAxiosRequestConfig} from 'axios';
import {storage} from './Storage';

let adminUrl = 'https://lastr-2e6b8883fcd1.herokuapp.com/api/';
// let adminUrl = 'http://192.168.1.8:5100/api';

export const baseURL = adminUrl;

let axiosInstance = axios.create({
  baseURL,
});

// export const imagePath = (media) => {
//   return `https://wtsacademy.dedicateddevelopers.us/uploads/product/${media}`;
// }
// export const imagePathProfile = (media) => {
//   return `https://wtsacademy.dedicateddevelopers.us/product/${media}`
// }

axiosInstance.interceptors.request.use(
  async function (config: InternalAxiosRequestConfig) {
    const token = storage.getString('token');
    if (token !== null || token !== undefined) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    // console.log(config.url, 'data');
    return config;
  },
  function (err) {
    return Promise.reject(err);
  },
);

export default axiosInstance;

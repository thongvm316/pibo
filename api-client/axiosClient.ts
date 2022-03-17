import axios from 'axios';
import queryString from 'query-string';

const axiosClient: any = axios.create({
  baseURL: process.env.SERVER_API,
  headers: {
    'content-type': 'application/json',
  },
  paramsSerializer: (params) => queryString.stringify(params),
});

// axiosClient.interceptors.request.use(
//   (config) => {
//     const pauthToken = localStorage.getItem("pauthToken")
//     if (pauthToken) {
//       config.headers.Authorization = `Bearer ${pauthToken}`
//     }

//     return config
//   },
//   (error) => Promise.reject(error)
// )

axiosClient.interceptors.response.use(
  (response: any) => {
    if (response.status === 401 && response.data?.message === '잘못된 토큰 정보입니다')
      location.href = '/login';
    return response;
  },
  (error: any) => {
    return Promise.reject(error);
  }
);

export default axiosClient;

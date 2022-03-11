import axiosClient from './axiosClient';

const authApi = {
  loginApi: (data) => {
    const url = '/pibo/api/login';
    return axiosClient.post(url, data);
  },

  logoutApi: () => {
    const url = '/pibo/api/logout';
    return axiosClient.get(url);
  },

  getUserList: () => {
    const url = '/pibo/api/users';
    return axiosClient.get(url);
  },

  getUser: () => {
    const url = '/pibo/api/user/{userId}';
    return axiosClient.get(url);
  },
  unlockUser: () => {
    const url = '/pibo/api/user/unlock';
    return axiosClient.post(url)
  }
};

export default authApi;

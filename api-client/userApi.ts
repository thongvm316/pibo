import { AxiosResponse } from 'axios';
import axiosClient from './axiosClient';
import Cookies from 'js-cookie';

export type Params = {
  userId: string | null;
  unlockFlg: string | null;
};

export type Body = {
  userId: string;
  aponCnsnNo: string;
};

type UserApi = {
  menuApi: () => Promise<AxiosResponse<any, any>>;
  unlockHistory: (url: string, params: Params) => Promise<AxiosResponse<any, any>>;
  unLockUser: (url: string, body: Body) => Promise<AxiosResponse<any, any>>;
};

const userApi: UserApi = {
  menuApi: () => {
    const url = '/pibo/api/menu';
    return axiosClient.get(url);
  },

  unlockHistory: (url, params) => {
    const pauth = Cookies.get('pauth');
    axiosClient.defaults.headers.Authorization = `Bearer ${pauth}`;

    return axiosClient.get(url, { params });
  },

  unLockUser: (url, body) => {
    return axiosClient.post(url, body);
  },
};

export default userApi;

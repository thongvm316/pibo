import { AxiosResponse } from 'axios';
import axiosClient from './axiosClient';

type UserApi = {
  menuApi: () => Promise<AxiosResponse<any, any>>;
  unlockHistory: (url: string, params: Params) => Promise<AxiosResponse<any, any>>;
};

export type Params = {
  userId: string | null;
  unlockFlg: string | null;
};

const userApi: UserApi = {
  menuApi: () => {
    const url = '/pibo/api/menu';
    return axiosClient.get(url);
  },

  unlockHistory: (url, params) => {
    return axiosClient.get(url, { params });
  },
};

export default userApi;

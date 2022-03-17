import userApi from '@/api-client/userApi';
import useSWR from 'swr';
import { Params, Body } from '@/api-client/userApi';

// export default function useUnlockHistory(params: Params) {
//   const { data, error } = useSWR(['/pibo/api/user/unlock/history', params], userApi.unlockHistory, {
//     revalidateOnFocus: false,
//   });

//   return {
//     data,
//     isLoading: !error && !data,
//     isError: error,
//   };
// }

export default function useUnlockHistory(params: Params) {
  const getData = async () => {
    try {
      const response = await userApi.unlockHistory('/pibo/api/user/unlock/history', params);
      return response.data;
    } catch (e) {
      console.log(e);
      return;
    }
  };

  const unLockUser = async (body: Body) => {
    try {
      const response = await userApi.unLockUser('/pibo/api/user/unlock', body);
      return response.data;
    } catch (e) {
      console.log(e);
      return;
    }
  };

  return { getData, unLockUser };
}

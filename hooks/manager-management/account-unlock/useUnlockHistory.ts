import userApi from '@/api-client/userApi';
import useSWR from 'swr';
import { Params } from '@/api-client/userApi';

export default function useUnlockHistory(params: Params) {
  const { data, error } = useSWR(['/pibo/api/user/unlock/history', params], userApi.unlockHistory, {
    revalidateOnFocus: false,
  });

  return {
    data,
    isLoading: !error && !data,
    isError: error,
  };
}

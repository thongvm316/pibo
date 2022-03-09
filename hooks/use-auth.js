import authApi from 'api-client/authApi';
import useSWR from 'swr';
import { PublicConfiguration } from 'swr/dist/types';
export function useAuth() {
  //profile
  const {
    data: profile,
    error,
    mutate,
  } = useSWR('/profile', {
    //option time
    dedupingInterval: 60 * 60 * 1000, //1h
    revalidateOnFocus: false, // no fetch profile when change tab
  });

  async function login(data) {
    await authApi.loginApi({
      username: data.username,
      password: data.password,
    });
    await mutate();
  }
  async function logout() {
    await authApi.logoutApi();
    mutate({}, false);
  }

  return {
    profile,
    error,
    login,
    logout,
  };
}

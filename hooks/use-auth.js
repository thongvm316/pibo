import authApi from 'api-client/authApi';
import useSWR from 'swr';

export function useAuth() {
  //managed user data
  const {
    data: user,
    error,
    mutate,
  } = useSWR('/pibo/api/users', {
    //option time
    dedupingInterval: 60 * 60 * 1000, //1h
    revalidateOnFocus: false, // no fetch profile when change tab
  });

  const firstTimeLoading = user === undefined && error === undefined;

  async function login(data) {
    await authApi.loginApi({
      id: data.id,
      password: data.password,
    });
    await mutate();
  }
  async function logout() {
    await authApi.logoutApi();
    //logout no longer call api
    mutate({}, false);
  }

  return {
    user,
    error,
    login,
    logout,
    firstTimeLoading,
  };
}

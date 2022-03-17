import React, { createContext, useState, useContext, useEffect } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import axiosClient from '@/api-client/axiosClient';
import authApi from '@/api-client/authApi';
import userApi from '@/api-client/userApi';

//api here is an axios instance which has the baseURL set according to the env.

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [firstTimeLogin, setFirstTimeLogin] = useState(true);
  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUserFromCookies() {
      console.log('hello');
      const pauth = Cookies.get('pauth');
      const pid = Cookies.get('pid');

      if (pauth) {
        try {
          console.log("Got a token in the cookies, let's see if it is valid");
          axiosClient.defaults.headers.Authorization = `Bearer ${pauth}`;
          const { data: user } = await authApi.getUser(pid);

          if (user) {
            setUser(user);
          } else {
            router.replace('/login');
          }

          const { data: menu } = await userApi.menuApi();
          localStorage.setItem('menuList', JSON.stringify(menu));
          if (menu) setMenu(menu.menuList);
        } catch (err) {
          router.replace('/login');
        }
      } else {
        router.replace('/login');
      }

      setLoading(false);
    }

    loadUserFromCookies();
  }, []);

  const login = async (data) => {
    const { data: res, headers } = await authApi.loginApi(data);

    if (res.result === 'S') {
      Cookies.set('pauth', headers?.pauth, { expires: 60 });
      Cookies.set('pid', headers?.pid, { expires: 60 });
      axiosClient.defaults.headers.Authorization = `Bearer ${headers?.pauth}`;
      // axiosClient.defaults.headers.pid = `Bearer ${headers?.pid}`;
      const { data: user } = await authApi.getUser(headers?.pid);
      const { data: menu } = await userApi.menuApi();

      setUser(user);
      setMenu(menu.menuList);
      localStorage.setItem('menuList', JSON.stringify(menu));

      return true;
    } else {
      alert(res.message);
    }

    setFirstTimeLogin(false);
    return false;
  };

  const logout = () => {
    Cookies.remove('pauth');
    Cookies.remove('pid');
    setUser(null);
    delete axiosClient.defaults.headers.Authorization;
    window.location.pathname = '/login';
  };

  // const getMenuList = async () => {
  //   try {
  //     const { data: menu } = await axiosClient.get(`/pibo/api/menu`);
  //     setMenu(menu.menuList);
  //     localStorage.setItem('menuList', JSON.stringify(menu));
  //   } catch (err) {}
  // };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated: !!user, user, login, loading, logout, firstTimeLogin }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

// export const ProtectRoute = ({ children }) => {
//   const { user } = useAuth();
//   if (!user) {
//     console.log(user)
//   }
//   return children;
// };

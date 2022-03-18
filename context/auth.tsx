import React, { createContext, useState, useContext, useEffect } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import axiosClient from '@/api-client/axiosClient';

export type AuthContextType = {
  isAuthenticated: any;
  user: any;
  login: any;
  loading: any;
  firstTimeLogin: any;
  logout: any;
};
const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: any) {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [firstTimeLogin, setFirstTimeLogin] = useState(true);
  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUserFromCookies() {
      const pauth = Cookies.get('pauth');
      const pid = Cookies.get('pid');
      if (pauth) {
        try {
          console.log("Got a token in the cookies, let's see if it is valid");
          axiosClient.defaults.headers.Authorization = `Bearer ${pauth}`;
          const { data: user } = await axiosClient.get(`/pibo/api/user/${pid}`);
          if (user) {
            setUser(user);
          } else {
            router.replace('/login');
          }
          const { data: menu } = await axiosClient.get(`/pibo/api/menu`);
          localStorage.setItem('menuList', JSON.stringify(menu));
          if (menu)
            setMenu(menu.menuList);
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

  const login = async (data: { id: string; password: string; }) => {
    const { data: res, headers } = await axiosClient.post('/pibo/api/login', data);
    if (res.result === 'S') {
      Cookies.set('pauth', headers?.pauth, { expires: 60 });
      Cookies.set('pid', headers?.pid, { expires: 60 });
      axiosClient.defaults.headers.Authorization = `Bearer ${headers?.pauth}`;
      // axiosClient.defaults.headers.pid = `Bearer ${headers?.pid}`;
      const { data: user } = await axiosClient.get(`/pibo/api/user/${headers?.pid}`);
      const { data: menu } = await axiosClient.get(`/pibo/api/menu`);
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
}

export const useAuth = () => useContext(AuthContext);

// export const ProtectRoute = ({ children }) => {
//   const { user } = useAuth();
//   if (!user) {
//     console.log(user)
//   }
//   return children;
// };

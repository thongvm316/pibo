import React, { createContext, useState, useContext, useEffect } from 'react';
import Cookies from 'js-cookie';
import Router, { useRouter } from 'next/router';
import axiosClient from '@/api-client/axiosClient';

//api here is an axios instance which has the baseURL set according to the env.

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
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
          const { data: user, status } = await axiosClient.get(`/pibo/api/user/${pid}`);
          if (user) setUser(user);
          const { data: menu } = await axiosClient.get(`/pibo/api/menu`);
          localStorage.setItem('menuList', JSON.stringify(menu));
          if (menu) setMenu(menu.menuList);
        } catch (err) {
          Router.replace('/login');
        }
      }
      setLoading(false);
    }
    loadUserFromCookies();
  }, []);

  const login = async (data) => {
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
    }
    return false;
  };

  const logout = () => {
    Cookies.remove('pauth');
    Cookies.remove('pid');
    setUser(null);
    delete axiosClient.defaults.headers.Authorization;
    window.location.pathname = '/login';
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated: !!user, user, login, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export const ProtectRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();
  if (isLoading || (!isAuthenticated && window.location.pathname !== '/login')) {
    return <div>Loading</div>;
  }
  return children;
};

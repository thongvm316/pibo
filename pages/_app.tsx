import '../styles/globals.scss';
import { EmptyLayout } from '@/components/Layout';
import { AppPropsWithLayout } from '@/models';
import { appWithTranslation } from 'next-i18next';
import * as React from 'react';
import Head from 'next/head';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider } from '@emotion/react';
import theme from '../styles/theme/theme';
import createEmotionCache from '@/styles/createEmotionCache';
import { SWRConfig } from 'swr';
import axiosClient from '@/api-client/axiosClient';
import 'styles/globals.scss';
import 'styles/managerManagement/admin_lock.scss';
// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();
//date picker
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateFnsAdapter from '@mui/lab/AdapterDateFns';
import { AuthProvider } from '@/context/auth';

function MyApp({
  Component,
  emotionCache = clientSideEmotionCache,
  pageProps,
}: AppPropsWithLayout) {
  const Layout = Component.Layout ?? EmptyLayout;
  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <SWRConfig value={{ fetcher: (url) => axiosClient.get(url), shouldRetryOnError: false }}>
          <Head>
            <title>PIBO Dashboard</title>
            <meta name="viewport" content="initial-scale=1, width=device-width" />
          </Head>
          <LocalizationProvider dateAdapter={DateFnsAdapter}>
            <AuthProvider>
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </AuthProvider>
          </LocalizationProvider>
        </SWRConfig>
      </ThemeProvider>
    </CacheProvider>
  );
}

export default appWithTranslation(MyApp);

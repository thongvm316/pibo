import * as React from 'react';
import Head from 'next/head';
import Script from 'next/script';
import 'styles/globals.scss';
import 'styles/globals.scss';
import theme from '../styles/theme/theme';
import 'styles/managerManagement/admin_lock.scss';
import CssBaseline from '@mui/material/CssBaseline';
import 'public/static/AUIGrid/AUIGrid_style.css';

import { EmptyLayout } from '@/components/Layout';
import { AppPropsWithLayout } from '@/models';
import { ThemeProvider } from '@mui/material/styles';
import { CacheProvider } from '@emotion/react';
import createEmotionCache from '@/styles/createEmotionCache';
import { SWRConfig } from 'swr';
import axiosClient from '@/api-client/axiosClient';
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
          {/* add AUIGrid */}
          <Script src="/static/AUIGrid/AUIGridLicense.js" strategy="beforeInteractive" />
          <Script src="/static/AUIGrid/AUIGrid.js" strategy="beforeInteractive" />
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

export default MyApp

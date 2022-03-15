import * as React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider } from '@emotion/react';
import theme from '../src/theme/theme';
import createEmotionCache from 'src/createEmotionCache';
import { appWithTranslation } from 'next-i18next';
import { SWRConfig } from 'swr';
import axiosClient from '@/api-client/axiosClient';

import 'styles/globals.scss';
import 'styles/managerManagement/admin_lock.scss';
// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();
//date picker
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateFnsAdapter from '@mui/lab/AdapterDateFns';

function MyApp(props) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const getLayout = Component.getLayout || ((page) => page);

  return (
    <CacheProvider value={emotionCache}>
      <SWRConfig value={{ fetcher: (url) => axiosClient.get(url), shouldRetryOnError: false }}>
        <Head>
          <title>PIBO Dashboard</title>
          <meta name="viewport" content="initial-scale=1, width=device-width" />
        </Head>
        <ThemeProvider theme={theme}>
          <LocalizationProvider dateAdapter={DateFnsAdapter}>
            <CssBaseline />
            {getLayout(<Component {...pageProps} />)}
          </LocalizationProvider>
        </ThemeProvider>
      </SWRConfig>
    </CacheProvider>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  emotionCache: PropTypes.object,
  pageProps: PropTypes.object.isRequired,
};

export default appWithTranslation(MyApp);

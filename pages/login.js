import { Button, Grid, Paper, TextField, Typography } from '@mui/material';
import { useAuth } from '@/hooks/use-auth';
import useLocalStorage from '@/hooks/useLocalStorage';
import userApi from '@/api-client/userApi';
import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import Logo from 'src/layouts/logo/Logo';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export default function Login() {
  const { t } = useTranslation('common');
  const router = useRouter();
  const { login } = useAuth({ revalidateOnMount: false });
  const { menuApi } = userApi;

  const [loginInfo, setLoginInfo] = useState({});
  const [_, setMenuList] = useLocalStorage('menuList', []);

  const { control, handleSubmit } = useForm({
    defaultValues: {
      id: '',
      password: '',
    },
  });

  const handleLoginClick = async (data) => {
    try {
      const loginApi = await login(data);
      setLoginInfo(loginApi);
    } catch (error) {
      alert(error);
    }
  };

  useEffect(async () => {
    if (loginInfo.result) {
      switch (loginInfo.result) {
        case 'S':
          try {
            const menu = await menuApi();
            setMenuList(menu);
            router.push('/');
          } catch (error) {
            alert(error);
          }
          break;

        default:
          alert(loginInfo.message);
          break;
      }
    }
  }, [loginInfo]);

  const paperStyle = { padding: 20, width: 400 };
  const marginStyle = { margin: '20px 0' };
  const gridStyle = {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  };

  return (
    <Grid container item style={gridStyle}>
      <Paper elevation={10} style={paperStyle}>
        <Grid
          container
          direction="column"
          textAlign="center"
          justifyItems="center"
          alignItems="center"
        >
          <Logo linkTo="/" src="/static/images/logos/logo.png" title="PIBO" />
          <Typography variant="h1">{t('login-to-your-account')}</Typography>
        </Grid>
        <form onSubmit={handleSubmit(handleLoginClick)}>
          <Controller
            name="id"
            rules={{ required: 'Please enter username' }}
            control={control}
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                label="Username"
                margin="normal"
                error={!!error}
                helperText={error ? error.message : null}
                fullWidth
              />
            )}
          />
          <Controller
            name="password"
            rules={{ required: 'Please enter password' }}
            control={control}
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                label="Password"
                type="password"
                margin="normal"
                error={!!error}
                helperText={error ? error.message : null}
                fullWidth
              />
            )}
          />
          <Button type="submit" variant="contained" style={marginStyle} fullWidth>
            {t('login')}
          </Button>
        </form>
      </Paper>
    </Grid>
  );
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, 'common')),
      // Will be passed to the page component as props
    },
  };
}

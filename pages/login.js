import { Button, Grid, Icon, Paper, TextField, Typography } from '@mui/material';
import axiosClient from '@/api-client/axiosClient';
import authApi from '@/api-client/authApi';
import React, { useEffect, useState } from 'react';
import FeatherIcon from 'feather-icons-react';
import { Controller, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import Logo from 'src/layouts/logo/Logo';
import { useAuth } from '@/hooks/use-auth';

export default function Login() {
  const { t } = useTranslation('common');
  const router = useRouter();
  const [result, setResult] = useState('');

  const { user, login } = useAuth({
    revalidateOnMount: false,
  });

  const { control, handleSubmit } = useForm({
    defaultValues: {
      id: '',
      password: '',
    },
  });

  const handleLoginClick = async (data) => {
    // const loginApi = authApi.loginApi({
    //   id: data.username,
    //   password: data.password,
    // })

    // loginApi.then((response) => setResult(response.result))
    try {
      await login(data);
      console.log('redirect to dashboard');
      // console.log(user || "no data")
    } catch (error) {
      console.log('login failed', error);
    }
  };

  useEffect(() => {
    if (result && result === 'S') {
      router.push('/');
    }
  }, [result]);

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
          {/* <FeatherIcon icon="log-in" width={"100"} height="100" /> */}
          <Logo linkTo="/" src="/static/images/logos/mainlogo.png" />
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

import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { Button, Grid, Paper, TextField, Typography } from '@mui/material';
import Logo from '@/components/Logo/Logo';
import { useAuth } from '@/context/auth';

export default function Login() {
  const { login } = useAuth();
  const router = useRouter();
  useAuth;

  const { control, handleSubmit } = useForm({
    defaultValues: {
      id: '',
      password: '',
    },
  });

  const handleLoginClick = async (data) => {
    try {
      let isLoginSuccess = await login(data);
      if (isLoginSuccess) {
        router.replace('/pims_prd_1');
      }
    } catch (error) {
      alert(error);
    }
  };

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
          <Typography variant="h1">Login To Account</Typography>
        </Grid>
        <form onSubmit={handleSubmit(handleLoginClick)}>
          <Controller
            name="id"
            rules={{ required: 'Enter the ID' }}
            control={control}
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                label="ID"
                margin="normal"
                error={!!error}
                helperText={error ? error.message : null}
                fullWidth
              />
            )}
          />
          <Controller
            name="password"
            rules={{ required: 'Enter the password' }}
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
            Login
          </Button>
        </form>
      </Paper>
    </Grid>
  );
}

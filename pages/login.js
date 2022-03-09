import { Button, Grid, Icon, Paper, TextField, Typography } from "@mui/material"
import axiosClient from "@/api-client/axiosClient"
import React, { useEffect, useState } from "react"
import FeatherIcon from "feather-icons-react"
import { Controller, useForm } from "react-hook-form"
import { useRouter } from "next/router"
import { useTranslation } from "next-i18next"
import Logo from "src/layouts/logo/Logo"

export default function Login() {
  const { t } = useTranslation("common")
  const router = useRouter()

  const [result, setResult] = useState("")

  const { control, handleSubmit } = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
  })

  const paperStyle = { padding: 20, width: 400 }
  const marginStyle = { margin: "20px 0" }
  const gridStyle = {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  }

  const handleLoginClick = (data) => {
    const callApi = axiosClient({
      method: "post",
      url: "https://i-dev-piboapi.amorepacific.com/pibo/api/login",
      data: {
        id: data.username,
        password: data.password,
      },
    })

    callApi.then((response) => setResult(response.result))
  }

  useEffect(() => {
    if (result && result === "S") {
      router.push("/")
    }
  }, [result])

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
          <Logo linkTo="/" title="BackOffice" />
          <Typography variant="h1">{t("login-to-your-account")}</Typography>
        </Grid>
        <form onSubmit={handleSubmit(handleLoginClick)}>
          <Controller
            name="username"
            rules={{ required: "Please enter username" }}
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
            rules={{ required: "Please enter password" }}
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
            {t("login")}
          </Button>
        </form>
      </Paper>
    </Grid>
  )
}

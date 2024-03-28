import * as React from 'react'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import Link from '@mui/material/Link'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { useForm } from 'react-hook-form'
import useAuth from '../hooks/useAuth'
import { loginUser } from '../services/Auth'
import { useLocation, useNavigate } from 'react-router-dom'
import { useSnackbar } from 'notistack'


export default function SignIn() {
  const { handleSubmit, register, formState: { errors } } = useForm()
  const { setAuth, setPersist } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || "/"
  const { enqueueSnackbar } = useSnackbar()

  const onSubmit = async (data) => {
    const {email, password, remember} = data
    try {
      setPersist(remember)
      
      const { accessToken, id } = await loginUser(email, password)

      setAuth({ accessToken, id })

      navigate(from, { replace: true })
      sessionStorage.setItem('loggedInUser',id);
      if(sessionStorage.getItem('currentPage')){
        window.location = sessionStorage.getItem('currentPage');
      }
    } catch (err) {
      let errMsg = ''
      if (!err?.response) {
        errMsg = 'No Server Response'
      } else if (err.response?.status === 400) {
        errMsg = 'Missing Username or Password'
      } else if (err.response?.status === 401) {
        errMsg = 'Unauthorized'
      } else {
        errMsg  = 'Login Failed'
      }

      enqueueSnackbar(errMsg, { variant: 'error', anchorOrigin: {
        vertical: 'top',
        horizontal: 'right'
      } })
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            {...register("email", { required: true })}
            error={!!errors.email}
            helperText={errors.email ? "Email is required" : ""}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            {...register("password", { required: true })}
            error={!!errors.password}
            helperText={errors.password ? "Password is required" : ""}
          />
          <FormControlLabel
            control={<Checkbox {...register("remember")} color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={Object.keys(errors).length !== 0}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/register" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  )
}

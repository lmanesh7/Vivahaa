import * as React from 'react'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import FormControlLabel from '@mui/material/FormControlLabel'
import Link from '@mui/material/Link'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { useForm, Controller } from 'react-hook-form'
import { useSnackbar } from 'notistack'
import axios from '../api/axios'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import { FormControl, FormLabel, InputLabel, Radio, RadioGroup } from '@mui/material'
import { useLocation, useNavigate } from 'react-router-dom'

const REGISTER_URL = '/register'

export default function Register() {
  const { handleSubmit, register, formState: { errors }, watch, control } = useForm()
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || "/"
  const { enqueueSnackbar } = useSnackbar()
  const password = React.useRef({})
  password.current = watch("password", "")

  const onSubmit = async (data) => {
    const { fullName, email, password, prefix, mobileNumber, userType } = data

    try {
      await axios.post(REGISTER_URL, JSON.stringify({ fullName, email, password, prefix, mobileNumber, userType }), {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true
      })

      enqueueSnackbar('Registration Successful', {
        variant: 'success', anchorOrigin: {
          vertical: 'top',
          horizontal: 'right'
        }
      })

      navigate(from, { replace: true })
    } catch (err) {
      let errMsg = ''
      if (!err?.response) {
        errMsg = 'No Server Response'
      } else if (err.response?.status === 400) {
        errMsg = 'Missing Username or Password'
      } else if (err.response?.status === 401) {
        errMsg = 'Unauthorized'
      } else {
        errMsg = 'Login Failed'
      }

      enqueueSnackbar(errMsg, {
        variant: 'error', anchorOrigin: {
          vertical: 'top',
          horizontal: 'right'
        }
      })
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            label="Full Name"
            autoFocus
            {...register('fullName', { required: true })}
            error={!!errors.fullName}
            helperText={errors.fullName && 'Full name is required'}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Email Address"
            {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
            error={!!errors.email}
            helperText={errors.email && 'Valid email is required'}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Password"
            type="password"
            {...register('password', { required: true })}
            error={!!errors.password}
            helperText={errors.password && 'Password is required'}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Confirm Password"
            type="password"
            {...register('confirmPassword', {
              required: true,
              validate: value => value === password.current || "Passwords do not match"
            })}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword && 'Passwords do not match'}
          />
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={3}>
              <FormControl>
                <InputLabel >Prefix</InputLabel>
                <Select
                  fullWidth
                  label="Prefix"
                  defaultValue="91"
                  {...register('prefix', { required: true })}
                  error={!!errors.prefix}
                >
                  <MenuItem value="91">+91</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={9}>
              <TextField
                margin="normal"
                required
                fullWidth
                label="Mobile Number"
                type="number"
                {...register('mobileNumber', { required: true, pattern: /^\d{10}$/ })}
                error={!!errors.mobileNumber}
                helperText={errors.mobileNumber && 'Valid 10-digit mobile number is required'}
              />
            </Grid>
          </Grid>

          <FormControl component="fieldset" margin="normal" fullWidth>
            <FormLabel component="legend">User Type</FormLabel>
            <Controller
              name="userType"
              control={control}
              defaultValue="User"
              rules={{ required: true }}
              render={({ field }) => (
                <RadioGroup row {...field}>
                  <FormControlLabel value="User" control={<Radio />} label="User" />
                  <FormControlLabel value="Vendor" control={<Radio />} label="Vendor" />
                </RadioGroup>
              )}
            />
            {errors.userType && <span>User type is required</span>}
          </FormControl>

          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  )
}

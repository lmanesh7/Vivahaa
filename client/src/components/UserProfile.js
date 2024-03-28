import * as React from 'react'
import { Avatar, Box, Button, Container, FormControl, FormHelperText, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import { useForm, Controller } from 'react-hook-form'
import { useSnackbar } from 'notistack'
import axios from '../api/axios'
import LoginUserContext from '../context/LoginUserProvider'
import useAxiosPrivate from '../hooks/useAxiosPrivate'
import { arrayBufferToBase64 } from '../utils'

const UserProfile = () => {
  const { user, setUser } = React.useContext(LoginUserContext)
  const { handleSubmit, control, formState: { errors }, reset, register, watch } = useForm()
  const { enqueueSnackbar } = useSnackbar()
  const axiosPrivate = useAxiosPrivate()
  const password = React.useRef({})
  password.current = watch("password", "")
  
  const buffer = user?.profilePicture?.data?.data
  const profilePicString = buffer ? arrayBufferToBase64(buffer, user.profilePicture.contentType) : ''
  const [previewImage, setPreviewImage] = React.useState(profilePicString || null)

  React.useEffect(() => {
    reset({
      fullName: user?.fullName,
      email: user?.email,
      mobileNumber: user?.mobileNumber,
    })
  }, [user, reset])

  const onSubmit = async (data) => {
    try {
      console.log(data)
      // Your form submission logic here
    } catch (error) {
      console.error('Error saving user details:', error)
      enqueueSnackbar('Failed to save user details', { variant: 'error' })
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          User Profile
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
            {...register('password')}
            error={!!errors.password}
            helperText={errors.password && 'Password is required'}
            autoComplete="new-password"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Confirm Password"
            type="password"
            {...register('confirmPassword', {
              validate: value => value === password.current || "Passwords do not match"
            })}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword && 'Passwords do not match'}
            autoComplete="new-password"
          />
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={3}>
              <FormControl fullWidth>
                <InputLabel>Prefix</InputLabel>
                <Select
                  label="Prefix"
                  defaultValue="91"
                  {...register('prefix', { required: true })}
                  error={!!errors.prefix}
                >
                  <MenuItem value="91">+91</MenuItem>
                </Select>
                {errors.prefix && <FormHelperText error>Prefix is required</FormHelperText>}
              </FormControl>
            </Grid>
            <Grid item xs={9}>
              <TextField
                margin="normal"
                required
                fullWidth
                label="Mobile Number"
                // type="number"
                {...register('mobileNumber', { required: true, pattern: /^\d{10}$/ })}
                error={!!errors.mobileNumber}
                helperText={errors.mobileNumber && 'Valid 10-digit mobile number is required'}
              />
            </Grid>
          </Grid>

          {/* Additional form fields can be added here */}

          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Update Profile
          </Button>
        </Box>
      </Box>
    </Container>
  )
}

export default UserProfile

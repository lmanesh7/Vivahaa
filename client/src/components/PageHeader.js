import React from 'react'
import { AppBar, Toolbar, Typography, Button, MenuItem, Container, Box } from '@mui/material'
import { Link } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import UserProfileDropdown from './UserProfileDropdown'
import '../css/PageHeader.css'

const menuItems = [
  { key: 'venues', label: '', href: '#' },
  { key: 'vendors', label: '', href: '#' }
]

const PageHeader = () => {
  const { isLogged } = useAuth()

  return (
    <AppBar
      position='fixed'
      sx={{
        boxShadow: 0,
        bgcolor: 'transparent',
        backgroundImage: 'none',
        mt: 2,
      }}
    >
      <Container maxWidth='lg'>
        <Toolbar
          variant='regular'
          sx={(theme) => ({
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexShrink: 0,
            borderRadius: '999px',
            bgcolor:
              theme.palette.mode === 'light'
                ? 'rgba(255, 255, 255, 0.4)'
                : 'rgba(0, 0, 0, 0.4)',
            backdropFilter: 'blur(24px)',
            maxHeight: 40,
            border: '1px solid',
            borderColor: 'divider',
            boxShadow:
              theme.palette.mode === 'light'
                ? `0 0 1px rgba(85, 166, 246, 0.1), 1px 1.5px 2px -1px rgba(85, 166, 246, 0.15), 4px 4px 12px -2.5px rgba(85, 166, 246, 0.15)`
                : '0 0 1px rgba(2, 31, 59, 0.7), 1px 1.5px 2px -1px rgba(2, 31, 59, 0.65), 4px 4px 12px -2.5px rgba(2, 31, 59, 0.65)',
          })}
        >
          <Box
            sx={{
              flexGrow: 1,
              display: 'flex',
              alignItems: 'center',
              ml: '-18px',
              px: 0,
            }}
          >
            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
              <MenuItem
                sx={{ py: '6px', px: '12px' }}
              >
                <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
                  <Link to='/' className='logo-text'>Vivahaa</Link>
                </Typography>
              </MenuItem>
              {
                menuItems.map((item) => (
                  <MenuItem
                    key={item.key}
                    sx={{ py: '6px', px: '12px' }}
                  >
                    <Typography variant="body2" color="text.primary">
                      {item.label}
                    </Typography>
                  </MenuItem>
                ))
              }
            </Box>
          </Box>
          <Box
            sx={{
              display: { xs: 'none', md: 'flex' },
              gap: 0.5,
              alignItems: 'center',
            }}
          >
            {
              isLogged ?
                <UserProfileDropdown /> :
                <>
                  <Button
                    color="primary"
                    variant="text"
                    size="small"
                    component={Link}
                    to='/login'
                  >
                    Sign in
                  </Button>
                  <Button
                    color="primary"
                    variant="contained"
                    size="small"
                    component={Link}
                    to='/register'
                  >
                    Sign up
                  </Button>
                </>
            }

          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default PageHeader

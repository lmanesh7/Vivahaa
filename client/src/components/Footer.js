import * as React from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import IconButton from '@mui/material/IconButton'
import Link from '@mui/material/Link'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Divider from '@mui/material/Divider'

import FacebookIcon from '@mui/icons-material/Facebook'
import TwitterIcon from '@mui/icons-material/X'
import PinterestIcon from '@mui/icons-material/Pinterest'
import InstagramIcon from '@mui/icons-material/Instagram'
import YouTubeIcon from '@mui/icons-material/YouTube'


function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" mt={1}>
      {'Copyright © '}
      <Link href="#">Vivahaa&nbsp;</Link>
      {new Date().getFullYear()}
    </Typography>
  )
}

export default function Footer({ showOnlyCopyright = false }) {
  return (
    <Box component="footer" sx={{ py: 4 }}>
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: { xs: 4, sm: 8 },
          py: { xs: 4, sm: 5 },
          textAlign: { sm: 'center', md: 'left' },
        }}
      >
        {!showOnlyCopyright && (<><Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            flexDirection: 'column',
            pt: { xs: 4, sm: 8 },
            width: '100%',
            borderTop: '1px solid',
            borderColor: 'divider',
          }}
        >
          <Typography variant="h6" fontWeight="bold">
            Vivahaa - Connecting Tradition With Convenience
          </Typography>
          <Typography variant="subtitle1" fontSize="small">
            Craft your dream wedding with Us
          </Typography>
          <Typography variant="body1">
            Vivahaa stands as a premier Indian Wedding Planning Website and app, offering a seamless experience to discover top-notch wedding vendors with just a click. Whether you seek expert wedding planners in India, renowned photographers, or simply inspiration for your special day, Vivahaa provides a comprehensive solution to your wedding planning needs. Through its innovative features including a handy checklist, extensive vendor directory, inspiring galleries, and insightful blog, Vivahaa streamlines the wedding planning process, sparing you from countless hours of preparation.
          </Typography>
        </Box>


        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            width: '100%',
            justifyContent: 'flex-start',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 4,
              minWidth: { xs: '100%', sm: '60%' },
            }}
          >
            <Box sx={{ width: { xs: '100%', sm: '55%' } }}>

              <Typography variant='h6' component='div' sx={{ flexGrow: 1 }} className='logo-text'>
                Vivahaa
              </Typography>

              <Typography variant="body2" fontWeight={600} gutterBottom>
                Newsletter
              </Typography>
              <Typography variant="body2" color="text.secondary" mb={2}>
                Subscribe to our newsletter for weekly updates and promotions.
              </Typography>
              <Stack direction="row" spacing={1} useFlexGap>
                <TextField
                  id="outlined-basic"
                  hiddenLabel
                  size="small"
                  variant="outlined"
                  fullWidth
                  aria-label="Enter your email address"
                  placeholder="Your email address"
                  inputProps={{
                    autoComplete: 'off',
                    'aria-label': 'Enter your email address',
                  }}
                />
                <Button variant="contained" color="primary" sx={{ flexShrink: 0 }}>
                  Subscribe
                </Button>
              </Stack>
            </Box>
          </Box>
          <Box
            sx={{
              display: { xs: 'none', sm: 'flex' },
              flexDirection: 'column',
              gap: 1,
            }}
          >
            <Typography variant="h6">
              Contact us to get best deals
            </Typography>

            <Box
              sx={{
                display: { xs: 'none', sm: 'flex' },
                gap: 1,
              }}
            >
              <div>
                <Typography variant="body1">
                  For Vendors
                </Typography>
                <Typography variant="body1">
                  <Link href="mailto:vendors@vivahaa.com">vendors@vivahaa.com</Link>
                </Typography>
                <Typography variant="body1">0124-6812346</Typography>
              </div>
              <Divider orientation="vertical" flexItem />
              <div>
                <Typography variant="body1">
                  For Users
                </Typography>
                <Typography variant="body1">
                  <Link href="mailto:users@vivahaa.com">users@vivahaa.com</Link>
                </Typography>
                <Typography variant="body1">0124-6812346</Typography>
              </div>

            </Box>
          </Box>
        </Box></>)
}

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            pt: { xs: 4, sm: 8 },
            width: '100%',
            borderTop: '1px solid',
            borderColor: 'divider',
          }}
        >
          <div>
            <Link color="text.secondary" href="#">
              Privacy Policy
            </Link>
            <Typography display="inline" sx={{ mx: 0.5, opacity: 0.5 }}>
              &nbsp;•&nbsp;
            </Typography>
            <Link color="text.secondary" href="#">
              Terms of Service
            </Link>
            <Copyright />
          </div>
          <Stack
            direction="row"
            justifyContent="left"
            spacing={1}
            useFlexGap
            sx={{
              color: 'text.secondary',
            }}
          >
            <IconButton
              color="inherit"
              sx={{ alignSelf: 'center', color: '#3b5998' }}
            >
              <FacebookIcon />
            </IconButton>
            <IconButton
              color="inherit"
              sx={{ alignSelf: 'center', color: '#000000' }}
            >
              <TwitterIcon />
            </IconButton>
            <IconButton
              color="inherit"
              sx={{ alignSelf: 'center', color: '#cb2027' }}
            >
              <PinterestIcon />
            </IconButton>
            <IconButton
              color="inherit"
              sx={{ alignSelf: 'center', color: '#e95950' }}
            >
              <InstagramIcon />
            </IconButton>
            <IconButton
              sx={{ alignSelf: 'center', color: '#ff0000' }}
            >
              <YouTubeIcon />
            </IconButton>
          </Stack>
        </Box>
      </Container>
    </Box>
  )
}
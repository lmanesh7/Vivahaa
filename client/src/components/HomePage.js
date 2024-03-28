import React, { useContext } from 'react'
import { Grid, Card, CardContent, CardMedia, Typography, CardActionArea } from '@mui/material'
import '../css/HomePage.css'

import musiciansLogo from '../images/musicians-dancers.jpg'
import panditsLogo from '../images/pandits.jpeg'
import foodcateringLogo from '../images/food-catering.jpeg'


import venuesLogo from '../images/venue-image.jpg';
import photographersLogo from '../images/photographers.jpg';
import diyLogo from '../images/diy-assistance.jpg';
import aboutLogo from '../images/Vivahaa_backgroundImage.jpg';
import makeupLogo from '../images/mehendiArtists.jpg';
import floristLogo from '../images/decorators.jpg';
import useAuth from '../hooks/useAuth'
import LoginUserContext from '../context/LoginUserProvider'
import useServices from '../hooks/useServices'
import { Link } from 'react-router-dom'

const gridItems = [
  {
    title: 'Venues',
    content: 'Find the perfect location for your special day.',
    logo: venuesLogo,
    serviceType: 'venues'
  },
  {
    title: 'Photographers',
    content: 'Capture every moment with the best professionals.',
    logo: photographersLogo,
    serviceType: 'photo'
  },
  {
    title: 'Mehendi Artists',
    content: 'Look your best with expert mehendi artists.',
    logo: makeupLogo,
    serviceType: 'mehindi'
  },
  {
    title: 'Florist and Decor',
    content: 'Beautiful arrangements to brighten your venue.',
    logo: floristLogo,
    serviceType: 'decor'
  },
  {
    title: 'Musicians and Dancers',
    content: 'Entertain your guests with live performances.',
    logo: musiciansLogo,
    serviceType: 'venues'
  },
  {
    title: 'Pandits',
    content: 'Find experienced pandits for traditional rituals.',
    logo: panditsLogo,
    serviceType: 'venues'
  },
  {
    title: 'Food/Catering Services',
    content: 'Delight your guests with exquisite cuisines.',
    logo: foodcateringLogo,
    serviceType: 'venues'
  },
  {
    title: 'DIY - Assistance',
    content: 'Get help with your do-it-yourself projects.',
    logo: diyLogo,
    serviceType: 'venues'
  },
]

const HomePage = () => {
  const { isLogged } = useAuth()
  const { user } = useContext(LoginUserContext)

  // const { venues, mehendiArtists } = useServices()

  // console.log('HomePage', venues, mehendiArtists)

  return (
    <>
      {/* <h1>{isLogged && user?.fullName}</h1> */}
      <Grid container spacing={2}>
        {gridItems.map((item, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card sx={{ height: '100%' }}>
              <CardActionArea component={Link} to={`/show/${item.serviceType}`}>
                <CardMedia
                  component="img"
                  height="140"
                  image={item.logo}
                  alt={item.title}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {item.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {item.content}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={2} sx={{ mt: 2 }}>
        <Grid item xs={12}>
          <Card className="advertising-card">
            <CardContent>
              <Typography variant="h5" component="div" align="center">
                Advertising Space
              </Typography>
              <Typography variant="body2" component="div" align="center">
                Your ad could be here
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  )
}

export default HomePage

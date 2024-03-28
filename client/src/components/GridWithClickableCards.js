import React from 'react';
import { Grid, Card, CardActionArea, CardContent, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const GridWithClickableCards = () => {

  // const cardItems = ['Venues', 'Makeup', 'Decorators', 'Photographers']

  const servicesList = [
    {
      name: 'Venues',
      path: '/profile-creation/venue'
    },
    {
      name: 'Mehendi Artist',
      path: '/profile-creation/mehendi-artist'
    },
    {
      name: 'Decorators',
      path: '/profile-creation/decorator'
    },
    {
      name: 'Photographers',
      path: '/profile-creation/photographer'
    }
  ]

  return (
    <Grid container spacing={3}>
      {servicesList.map((srv, index) => (
        <Grid item xs={12} sm={4} key={index}>
          <Card sx={{
              transition: 'background-color 0.3s',
              '&:hover': {
                backgroundColor: '#2196f3', // Blue color on hover
              },
            }}>
            <CardActionArea component={Link} to={srv.path}>
            {/* <CardActionArea component={Link} to={`/register`}> */}
              <CardContent sx={{ padding: '20px' }}>
                <Typography variant="h5" sx={{ paddingBottom: '10px' }}>{srv.name}</Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default GridWithClickableCards;

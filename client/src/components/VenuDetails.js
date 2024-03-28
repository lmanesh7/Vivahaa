import React from 'react';
import { Grid, Typography, Card, CardContent, CardMedia, IconButton, Divider } from '@mui/material';
import { LocationOn, Phone, Email, Star, StarBorder } from '@mui/icons-material';

const VenueDetails = ({ venue }) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
        <Typography variant="h4" gutterBottom>
          {venue.businessName}
        </Typography>
        <Card sx={{ maxWidth: 600 }}>
          <CardMedia
            component="img"
            height="300"
            image={venue.image}
            alt={venue.businessName}
          />
        </Card>
      </Grid>
      <Grid item xs={12} md={6}>
        <Typography variant="body1">
          {venue.description}
        </Typography>
        <Divider sx={{ my: 2 }} />
        <Typography variant="h6" gutterBottom>
          Location
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          <LocationOn /> {venue.address}
        </Typography>
        <Divider sx={{ my: 2 }} />
        <Typography variant="h6" gutterBottom>
          Contact Info
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          <Phone /> {venue.contactInfo.phoneNumber}
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          <Email /> {venue.contactInfo.email}
        </Typography>
        <Divider sx={{ my: 2 }} />
        <Typography variant="h6" gutterBottom>
          Pricing
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          <strong>Veg Plate:</strong> {venue.pricePerPlateVeg}
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          <strong>Non-Veg Plate:</strong> {venue.pricePerPlateNonVeg}
        </Typography>
      </Grid>
      {/* Add more sections like gallery, reviews, etc. */}
    </Grid>
  );
};

export default VenueDetails;

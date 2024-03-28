import React, { useContext, useEffect, useState } from 'react'
import { Grid, Card, CardContent, CardMedia, Typography, CardActionArea, Modal, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material'

import AddCircleSharpIcon from '@mui/icons-material/AddCircleSharp'
import GridWithClickableCards from './GridWithClickableCards'
import LoginUserContext from '../context/LoginUserProvider'
import { Link, useParams, useLocation } from 'react-router-dom';

import VenuesService from '../services/Venues' // Assuming a function to fetch services data
import MehendiArtistsService from '../services/MehendiArtists'
import decoratorsService from '../services/Decorators'
import PhotoService from '../services/Photos'
import axios from '../api/axios'
// const gridItemsList = [
//   {
//     title: 'Evergreen Garden Estate',
//     content: 'Find the perfect location for your special day.',
//     logo: venuesLogo,
//   },
//   {
//     title: 'Harmony Hall',
//     content: 'Capture every moment with the best professionals.',
//     logo: photographersLogo,
//   }
// ]

const AddServiceCard = ({ handleCardClick }) => {
  return (
    <Card sx={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderWidth: '4px', borderStyle: 'dashed', borderColor: 'primary.main' }} variant="outlined">
      <CardActionArea sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
      }} onClick={handleCardClick}>
        <CardContent sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <AddCircleSharpIcon fontSize="large" color='primary' />
          <Typography variant="body1" align="center">
            Add New Service
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

const createGridItems = (gridItemsList) => {
  
  return gridItemsList.map((item, index) => (
    <Grid item xs={12} sm={6} md={4} key={index}>
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
    <CardActionArea component={Link}  to={{
          pathname: `/view-venue/${item._id}`,
          state: { venue: item } // Pass venue data as state
        }}
        style={{ textDecoration: 'none' }}>
        <CardMedia
          component="img"
          height="140"
          image={`http://localhost:3500/uploads/images/${item.image}`}
          alt={item.businessName}
        />
      </CardActionArea>
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h5" gutterBottom>
          {item.businessName}
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          <strong>Address:</strong> {item.address}
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          <strong>Price Quote:</strong> {item.priceQuote}
        </Typography>
     
      </CardContent>
    </Card>
  </Grid>
  
  
  ))
}


const createGridItems_Mehendi = (gridItemsList) => {
  
  return gridItemsList.map((item, index) => (
    <Grid item xs={12} sm={6} md={4} key={index}>
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
    <CardActionArea component={Link}  to={{
          pathname: `/view-mehindi-artist/${item._id}`,
          state: { venue: item } // Pass venue data as state
        }}
        style={{ textDecoration: 'none' }}>
        <CardMedia
          component="img"
          height="140"
          image={`http://localhost:3500/uploads/images/${item.image}`}
          alt={item.businessName}
        />
      </CardActionArea>
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h5" gutterBottom>
          {item.businessName}
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          <strong>Address:</strong> {item.address}
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          <strong>Price Quote:</strong> {item.priceQuote}
        </Typography>
      </CardContent>
    </Card>
  </Grid>
  
  
  ))
}

const createGridItems_Decorator = (gridItemsList) => {
  
  return gridItemsList.map((item, index) => (
    <Grid item xs={12} sm={6} md={4} key={index}>
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
    <CardActionArea component={Link}  to={{
          pathname: `/view-decorator/${item._id}`,
          state: { venue: item } // Pass venue data as state
        }}
        style={{ textDecoration: 'none' }}>
        <CardMedia
          component="img"
          height="140"
          image={`http://localhost:3500/uploads/images/${item.image}`}
          alt={item.businessName}
        />
      </CardActionArea>
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h5" gutterBottom>
          {item.businessName}
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          <strong>Address:</strong> {item.address}
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          <strong>Decor Type:</strong> {item.services}
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          <strong>Price:</strong> {item.price}
        </Typography>
      </CardContent>
    </Card>
  </Grid>
  
  
  ))
}


const createGridItems_Photographer = (gridItemsList, handleMenuOpen) => {
  
  return gridItemsList.map((item, index) => (
    <Grid item xs={12} sm={6} md={4} key={index}>
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' , position: 'relative'}}>
    <CardActionArea component={Link} to={`/view-photographer/${item._id}`}>
        <CardMedia
          component="img"
          height="140"
          image={`http://localhost:3500/uploads/images/${item.image}`}
          alt={item.businessName}
        />
     
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h5" gutterBottom>
          {item.businessName}
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          <strong>Address:</strong> {item.address}
        </Typography>
        {/* <Typography variant="body2" color="text.secondary" gutterBottom>
          <strong>Price Quote:</strong> {item.priceQuote}
        </Typography> */}
        <Typography variant="body2" color="text.secondary" gutterBottom>
          <strong>Contact Info:</strong> {item.contact}
        </Typography>
     
      </CardContent>
      </CardActionArea>
    </Card>
  </Grid>
  
  
  ))
}


const HomePageDasher = () => {
  const serviceType = useParams('serviceType');
  const [renderVenue, setRenderVenue] = useState(false);
  const [renderMehendiArtists, setRenderMehendiArtists] = useState(false);
  const [renderDecor, setRenderDecor] = useState(false);
  const [renderPhoto, setRenderPhoto] = useState(false);
  const [venues, setVenues] = useState([])
  const [mehendiArtists, setMehendiArtists] = useState([])
  const [decorators, setDecorators] = useState([])
  const [photographers, setPhotographers] = useState([])
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = React.useState(false);
  const [dataFetched, setDataFetched] = useState(false); // Track if data has been fetched

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!dataFetched) { // Fetch data only if it hasn't been fetched before
          const venuesData = await VenuesService.getAllVenues();
          setVenues(venuesData);

          const mehendiArtistData = await MehendiArtistsService.getAllMehendiArtists();
          setMehendiArtists(mehendiArtistData);

          const decoratorsData = await decoratorsService.getAlldecorators();
          setDecorators(decoratorsData);

          debugger;
          const photographerData = await axios.get('api/photo/all');//PhotoService.getAllPhotographers();
          setPhotographers(photographerData.data);

          setDataFetched(true); // Update the state to indicate that data has been fetched
        }

      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); 
  //const { venues, mehendiArtists , decorators} = useContext(LoginUserContext)
  
 useEffect(() => {
    if(serviceType.serviceType==='venues'){
        setRenderVenue(true);
    }
    if(serviceType.serviceType==='mehindi'){
        setRenderMehendiArtists(true);
    }
    if(serviceType.serviceType==='decor'){
        setRenderDecor(true);
    }
    if(serviceType.serviceType==='photo'){
      setRenderPhoto(true);
    }
 });

  const venuesList = venues.map(v => {
    return {
      _id: v._id,
      businessName: v.businessName,
      description: v.description,
      image: v.image,
      seatingCapacity: v.seatingCapacity,
      cuisinesAvailable: v.cuisinesAvailable,
      facilitiesAvailable: v.facilitiesAvailable,
      pricePerPlateVeg: v.pricePerPlateVeg,
      pricePerPlateNonVeg: v.pricePerPlateNonVeg,
      address: v.address,
      contactInfo: v.contactInfo,
      priceQuote: v.priceQuote
    }
  })

  const mehendiArtistsList = mehendiArtists.map(m => {
    return {
      _id: m._id,
      businessName: m.businessName,
      description: m.workDescription,
      image: m.image,
      address: m.address,
      priceQuote: m.priceQuote,
      contactInfo: m.contactInfo
    }
  })
  
const decoratorsList = decorators.map(d => {
  return {
    _id: d._id,
    businessName: d.businessName,
    serviceDescription: d.serviceDescription,
    services: d.services,
    price: d.price,
    address: d.address,
    image: d.image,
    email: d.email,
    phone: d.phone
  }
})
const photographerList = photographers.map((p) => {
  return {
  _id: p._id,
  businessName: p.businessName,
  image: p.image,
  About: p.About,
  albumPrice: p.albumPrice,
  contact: p.contact,
  address: p.address
  }
});
  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const descriptionElementRef = React.useRef(null)
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef
      if (descriptionElement !== null) {
        descriptionElement.focus()
      }
    }
  }, [open])


  const gridItems = createGridItems([...venuesList])
  const gridItems_mehindi = createGridItems_Mehendi([...mehendiArtistsList])
  const gridItems_decorators = createGridItems_Decorator([...decoratorsList])
  const gridItems_photographers = createGridItems_Photographer([...photographerList]);
 // gridItems.unshift(<Grid item xs={12} sm={6} md={4} key='add-service'><AddServiceCard handleCardClick={handleClickOpen} /></Grid>)
 // gridItems_mehindi.unshift(<Grid item xs={12} sm={6} md={4} key='add-service'><AddServiceCard handleCardClick={handleClickOpen} /></Grid>)

  return (
    <>
      <Grid container spacing={2}>  
        {renderVenue && gridItems}
        {renderMehendiArtists && gridItems_mehindi}
        {renderDecor && gridItems_decorators}
        {renderPhoto && gridItems_photographers}
      </Grid>
      
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth={true}
        maxWidth='md'
        scroll={'paper'}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">Select the Services You Offer</DialogTitle>
        <DialogContent dividers={true}>
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
          >
            <GridWithClickableCards />

          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>

    </>
  )
}


export default HomePageDasher

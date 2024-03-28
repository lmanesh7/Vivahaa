import React, { useState, useEffect } from 'react';
import {
    Grid,
    Typography,
    Card,
    CardContent,
    CardMedia,
    IconButton,
    Divider,
    TextField,
    Button,
    Box,
    Dialog,
    DialogContent,
    DialogActions,
  } from "@mui/material";
import { LocationOn, Phone, Email, Star, StarBorder } from '@mui/icons-material';
import { useParams } from 'react-router-dom';
import VenuesService from '../services/Venues';
import { axiosPrivate } from '../api/axios';
import axios from '../api/axios';
import { enqueueSnackbar } from 'notistack';
const DecorDetails = () => {
    const { venueId } = useParams();
    const [venue, setVenue] = useState(null);
    const [images, setImages] = useState([]);
    const [bookingInfo, setBookingInfo] = useState({
        serviceId:venueId,
        serviceType: 'decor',
        fullName: '',
        phone: '',
        email: '',
        message: ''
    });
    const [bookingSuccess, setBookingSuccess] = useState(false);
    const formdata = new FormData();
    const [reviews, setReviews] = useState([
        { id: 1, author: 'John Doe', rating: 4, comment: 'Great venue, excellent service!' },
        { id: 2, author: 'Jane Smith', rating: 5, comment: 'Wonderful experience, highly recommended!' }
    ]);
    const [imageIndex, setImageIndex] = useState(0);
    const [openModal, setOpenModal] = useState(false);
    const [viewMore, setViewMore] = useState(false);

    useEffect(() => {
        const fetchVenue = async () => {
            try {
                
                //const venueData = await VenuesService.getVenuesById(axiosPrivate, venueId);
                const venueData = await axios.get(`/api/getDecoratorById?id=${venueId}`);
                setVenue(venueData.data);
                setImages(JSON.parse(venueData.data.workImages));
            } catch (error) {
                console.error('Error fetching venue details:', error);
            }
        };

        fetchVenue();
    }, [venueId]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setBookingInfo(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try { 
           
            formdata.append('serviceId',venueId);
            formdata.append('serviceType','decor');
            formdata.append('fullName',bookingInfo.fullName);
            formdata.append('phone',bookingInfo.phone);
            formdata.append('email', bookingInfo.email);
            formdata.append('message',bookingInfo.message);
           
            // Submit booking info to backend
            const response = await axios.post('/api/messageVendor', bookingInfo);
            console.log('Response:', response.data);
            enqueueSnackbar('Message sent successfully', {
                variant: 'success', anchorOrigin: {
                  vertical: 'top',
                  horizontal: 'right'
                }
              });
            // Clear booking info and set booking success to true
            setBookingInfo({
                fullName: '',
                email: '',
                phone: '',
                message:''
            });
            setBookingSuccess(true);
        } catch (error) {
            console.error('Error submitting booking:', error);
            enqueueSnackbar('Error while sending the message', {
                variant: 'error', anchorOrigin: {
                  vertical: 'top',
                  horizontal: 'right'
                }
            });
        }
    };
    
    const handleImageClick = (index) => {
        setImageIndex(index);
        setOpenModal(true); // Open modal when image is clicked
      };
    
      const handleCloseModal = () => {
        setOpenModal(false);
      };
    
      const handleViewMore = () => {
        setViewMore(true);
      };
      const handleBooking = () => {
        if(!sessionStorage?.getItem('loggedInUser')){
          alert("user not logged in");
          window.location = '../login';
          sessionStorage.setItem('currentPage',window.location.href);
        }
        else{
         // <Link to="/booking" component={BookingForm} />
          window.location = `../booking/${'decor'}/${venue._id}`

        }
      };
    if (!venue) {
        return <div>Loading...</div>;
    }

    return (
        <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
                <Typography variant="h4" gutterBottom>
                    {venue.businessName}
                </Typography>
                <Card sx={{ maxWidth: 600 }}>
                    <CardMedia
                        component="img"
                        height="300"
                        image={`http://localhost:3500/uploads/images/${venue.image}`}
                        alt={venue.businessName}
                    />
                </Card>
                {sessionStorage.getItem('role')!='5151'&&(<Button variant="contained" color="primary" fullWidth onClick={handleBooking}>
                    Book this Decorator
                </Button>)}
            </Grid>
            <Grid item xs={12} md={6}>
                <Typography variant="body1">
                    {venue.serviceDescription}
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
                    <Phone /> {venue.email}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                    <Email /> {venue.phone}
                </Typography>
                <Divider sx={{ my: 2 }} />
                <Typography variant="h6" gutterBottom>
                    Services Offered
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                   {venue.services}
                </Typography>
                <Typography variant="h6" gutterBottom>
                    Pricing
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                    <strong>Price Quoted:</strong> {venue.price}
                </Typography>
             
            </Grid>
            <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>
                    Reviews
                </Typography>
                <Grid container spacing={2}>
                    {reviews.map(review => (
                        <Grid item xs={12} key={review.id}>
                            <Box display="flex" alignItems="center">
                                {Array.from({ length: review.rating }, (_, index) => (
                                    <Star key={index} />
                                ))}
                                <Typography variant="body2" color="text.secondary">
                                    &nbsp;- {review.author}
                                </Typography>
                            </Box>
                            <Typography variant="body1">{review.comment}</Typography>
                            <Divider />
                        </Grid>
                    ))}
                </Grid>
            </Grid>
            <Grid item xs={12}>
        <Typography variant="h6" gutterBottom>
          Image Gallery
        </Typography>
        <div className="image-gallery">
          {images.slice(0, viewMore ? images.length : 3).map((image, index) => (
            <img
              key={index}
              src={`http://localhost:3500/uploads/images/${image}`}
              alt={`Image ${index + 1}`}
              onClick={() => handleImageClick(index)} // Add click event handler
            />
          ))}
        </div>
        <div className="view-buttons-container">
          {!viewMore && images.length > 3 && (
            <Button variant="outlined" color="primary" onClick={handleViewMore}>
              View More
            </Button>
          )}
          {viewMore && (
            <Button
              variant="outlined"
              color="primary"
              onClick={() => setViewMore(false)}
            >
              View Less
            </Button>
          )}
        </div>
      </Grid>
       {sessionStorage.getItem('role')!='5151'&& (     <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>
                    Contact Vendor
                </Typography>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={4}>
                            <TextField
                                fullWidth
                                label="Full Name"
                                name="fullName"
                                value={bookingInfo.fullName}
                                onChange={handleInputChange}
                                required
                            />
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <TextField
                                fullWidth
                                label="Phone"
                                name="phone"
                                value={bookingInfo.phone}
                                onChange={handleInputChange}
                                required
                            />
                        </Grid>
                        <Grid item xs={12} >
                            <TextField
                                fullWidth
                                label="Email"
                                name="email"
                                value={bookingInfo.email}
                                onChange={handleInputChange}
                                required
                            />
                        </Grid>
                        <Grid item xs={12} >
                            <TextField
                                fullWidth
                                label="Message"
                                name="message"
                                value={bookingInfo.message}
                                onChange={handleInputChange}
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button type="submit" variant="contained" color="primary">
                                Send Message
                            </Button>
                        </Grid>
                    </Grid>
                </form>
                {bookingSuccess && (
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                        Message  successfully!
                    </Typography>
                )}
            </Grid>
            )}
             <Dialog open={openModal} onClose={handleCloseModal} maxWidth="md">
        <DialogContent>
          <img
            src={`http://localhost:3500/uploads/images/${images[imageIndex]}`}
            alt={`Zoomed-in Image`}
            style={{ width: "100%", height: "auto" }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="primary">
            Close
                      </Button>
        </DialogActions>
      </Dialog>
        </Grid>
    );
};

export default DecorDetails;

import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Paper, Button, Grid, Typography } from '@material-ui/core';
import { Storefront } from '@material-ui/icons';
import venuesLogo from '../images/venue-image.jpg';
import photographersLogo from '../images/photographers.jpg';
import diyLogo from '../images/diy-assistance.jpg';
import aboutLogo from '../images/Vivahaa_backgroundImage.jpg';
import mehendiLogo from '../images/mehendiArtists.jpg';
import decoratorLogo from '../images/decorators.jpg';
import showImage1 from '../images/showImage1.jpg';
import showImage2 from '../images/showImage2.jpg';
import BudgetSynopsis from './BudgetSynopsis';
import axios from '../api/axios';
import EventDetailsPopup from './EventDetailsPopup';
import { Edit } from '@material-ui/icons';

const useStyles = makeStyles(theme => ({
  root: {
    position: 'relative',
    overflow: 'hidden',
    borderRadius: theme.shape.borderRadius,
  },
  slider: {
    position: 'relative',
    width: '100%',
    height: '500px', // Adjust the height as needed
    display: 'flex',
    transition: 'transform 0.5s ease',
  },
  slide: {
    position: 'relative',
    width: '100%',
    flex: '0 0 auto',
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    objectPosition: 'center', // Center the image within its container
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black overlay
    padding: theme.spacing(2),
    color: '#fff',
  },
  button: {
    marginTop: theme.spacing(1),
  },
  dotContainer: {
    position: 'absolute',
    bottom: theme.spacing(2),
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    zIndex: 1,
  },
  dot: {
    width: theme.spacing(1.5),
    height: theme.spacing(1.5),
    borderRadius: '50%',
    margin: theme.spacing(0, 0.5),
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    backgroundColor: '#ccc', // Inactive dot color
  },
  activeDot: {
    backgroundColor: theme.palette.primary.main,
  },
  findVendors: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: theme.spacing(4),
  },
  findVendorsButton: {
    textTransform: 'none',
    marginRight: theme.spacing(2),
    padding: theme.spacing(1.5, 3),
  },
  aboutUs: {
    padding: theme.spacing(4),
    textAlign: 'left',
    marginTop: theme.spacing(18), // Adjust the margin top as needed
  },
  aboutContent: {
    marginTop: theme.spacing(4),
  },
  aboutImage: {
    maxWidth: '100%',
    height: 'auto',
    borderRadius: theme.shape.borderRadius,
  },
  checklistGrid: {
    marginTop: theme.spacing(4),
    padding: theme.spacing(2),
    backgroundColor: '#f5f5f5',
    borderRadius: theme.spacing(2),
  },
  checklistItem: {
    backgroundColor: '#fff',
    padding: theme.spacing(2),
    borderRadius: theme.spacing(1),
    marginBottom: theme.spacing(2),
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: '#f0f0f0',
    },
  },
  categoryIcon: {
    marginRight: theme.spacing(1),
  },
}));

const ImageSlider = () => {
  const slides = [
    {
      image: aboutLogo,
      title: '',
      description: '',
      buttonText: ''
    },
    {
      image: showImage1,
      title: '',
      description: '',
      buttonText: ''
    },
    {
      image: showImage2,
      title: '',
      description: '',
      buttonText: ''
    },
    {
      image: venuesLogo,
      title: 'Venues',
      description: 'Find the perfect location for your special day.',
      buttonText: 'Find',
    },
    {
      image: mehendiLogo,
      title: 'Mehendi Artists',
      description: 'Look your best with expert mehendi artists.',
      buttonText: 'Get a Design',
    },
    {
      image: photographersLogo,
      title: 'Photographers',
      description: 'Capture every moment with the best professionals.',
      buttonText: 'Click',
    },
    {
      image: decoratorLogo,
      title: 'Decorators',  
      description: 'Beautiful arrangements to brighten your venue.',
      buttonText: 'Decorate',
    }
  ];

  const classes = useStyles();
  const [activeIndex, setActiveIndex] = useState(0);
  const userLoggedIn = sessionStorage.getItem('loggedInUser');
  const [budget, setBudget] = useState(0);
  const [totalCost, setTotalCost] = useState(0);
  const [totalPaid, setTotalPaid] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const [checklistItems, setChecklistItems] = useState([]);

  // Function to move to the next slide
  const nextSlide = () => {
    setActiveIndex(prevIndex => (prevIndex + 1) % slides.length);
  };

  useEffect(() => {
    if (userLoggedIn) {
      fetchBudgetData();
      fetchChecklistItems();
    }
  }, [userLoggedIn]);

  useEffect(() => {
    // Check if event details are stored in session storage
    const eventDate = localStorage.getItem('eventDate');
    const location = localStorage.getItem('location');
    const estimatedGuests = localStorage.getItem('estimatedGuests');

    if (!eventDate || !location || !estimatedGuests) {
      // If event details are not stored, show the popup
      setShowPopup(true);
    }
  }, []);

  const handlePopupClose = () => {
    // Close the popup
    setShowPopup(false);
  };

  const fetchBudgetData = async () => {
    try {
      const response = await axios.get(`http://localhost:3500/api/budget/${userLoggedIn}`);
      const { budget, totalCost, totalPaid, items, eventDate_ } = response.data;
      setBudget(budget);
      setTotalCost(totalCost);
      setTotalPaid(totalPaid);
    } catch (error) {
      console.error('Error fetching budget data:', error);
    }
  };

  const fetchChecklistItems = async () => {
    try {
      // Fetch checklist items from the server
      const response = await axios.get(`http://localhost:3500/api/tasksforhomepage/${userLoggedIn}`);
      debugger;
      setChecklistItems(response.data);
    } catch (error) {
      console.error('Error fetching checklist items:', error);
    }
  };

  const handleEditDetails = () => {
    // Redirect to the page where users can edit event details
    localStorage.clear();
    window.location = './';
  };

  useEffect(() => {
    // Set up auto-slide timer
    const interval = setInterval(nextSlide, 4000); // Change slide every 4 seconds

    // Clean up timer on component unmount
    return () => clearInterval(interval);
  }, []); // Run this effect only once on component mount

  const handleDotClick = index => {
    setActiveIndex(index);
  };

  const handleFindVendors = () => {
    // Perform navigation or other action for finding vendors
    console.log('Find All Vendors clicked');
    window.location = './home';
  };
  const handleChecklistClick = () => {
    // Redirect to the checklist page
    window.location = './wedding-checklist';
  };

  // Function to handle button click for each slide
  const handleButtonClick = (index) => {
    switch (index) {
      case 3:
        // Handle button click for Venues slide
        console.log('Venues button clicked');
        window.location = './show/venues';
        break;
      case 4:
        // Handle button click for Mehendi Artists slide
        console.log('Mehendi Artists button clicked');
        window.location = './show/mehindi';
        break;
      case 5:
        // Handle button click for Photographers slide
        console.log('Photographers button clicked');
        window.location = './show/photo';
        break;
      case 6:
        // Handle button click for Decorators slide
        console.log('Decorators button clicked');
        window.location = './show/decor';
        break;
      default:
        break;
    }
  };

  return (
    <> 
      <EventDetailsPopup open={showPopup} onClose={handlePopupClose} />
      <Grid item xs={12} className={classes.eventDetails}>
          
              <Box display="flex" alignItems="center">
                <Typography variant="body1" gutterBottom>
                   Date: {localStorage.getItem('eventDate')}
                </Typography>
                <Button color="primary" startIcon={<Edit />} onClick={handleEditDetails}>
                </Button>
                <Typography variant="body1" gutterBottom>
                  Location: {localStorage.getItem('location')}
                </Typography>
                <Button color="primary" startIcon={<Edit />} onClick={handleEditDetails}>
                  
                </Button>
              </Box>
              <Box display="flex" alignItems="center">
          
              </Box>
            </Grid>
      <Paper elevation={3} className={classes.root}>
        <div className={classes.slider} style={{ transform: `translateX(-${activeIndex * 100}%)` }}>
          {slides.map((slide, index) => (
            <div key={index} className={classes.slide}>
              <img src={slide.image} alt={`Slide ${index}`} className={classes.image} />
              <div className={classes.overlay}>
                <h3>{slide.title}</h3>
                <p>{slide.description}</p>
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  onClick={() => handleButtonClick(index)} // Pass the index to the click handler
                >
                  {slide.buttonText}
                </Button>
              </div>
            </div>
          ))}
        </div>
        <Box className={classes.dotContainer}>
          {slides.map((_, index) => (
            <div
              key={index}
              className={`${classes.dot} ${index === activeIndex ? classes.activeDot : ''}`}
              onClick={() => handleDotClick(index)}
            />
          ))}
        </Box>
      </Paper>
      <div className={classes.findVendors}>
        <Button
          variant="contained"
          color="primary"
          className={classes.findVendorsButton}
          startIcon={<Storefront />}
          onClick={handleFindVendors}
        >
          Find All Vendors
        </Button>
      </div>
         
      <div className={classes.aboutUs}>
        {sessionStorage.getItem('loggedInUser') && (
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <BudgetSynopsis totalBudget={budget} totalCost={totalCost} totalPaid={totalPaid} />
            </Grid>
            <Grid item xs={12} sm={6} className={classes.checklistGrid} onClick={handleChecklistClick}>
  <Typography variant="h6" gutterBottom>
    Next items on your checklist  
  </Typography>
  {checklistItems.map((item, index) => (
    <div key={index}>
      <Typography variant="subtitle1" gutterBottom>
        {item.category}
      </Typography>
      {item.tasks.map((task, taskIndex) => (
        <Paper key={task._id} className={classes.checklistItem}>
          <Typography variant="body1">{task.description}</Typography>
        </Paper>
      ))}
    </div>
  ))}
</Grid>

          </Grid>
        )}
        <h2>About Us</h2>
        <Grid container spacing={3} justify="center" alignItems="center" className={classes.aboutContent}>
          <Grid item xs={12} sm={6}>
            <p>
              Vivaaha is a streamlined platform for planning weddings, It connects couples with a wide range of wedding service providers including venues, mehndi artists, caterers, makeup artists, musicians, dancers, florists, and event organizers. It features separate interfaces for users and vendors, simplifying searches, bookings, and communication. Excitingly, we've added a new dimension – "Advertise with Vivaaha," allowing businesses to showcase products. Vivaaha's goal is to ease the wedding planning process with efficiency and a touch of tradition
            </p>
          </Grid>
          <Grid item xs={12} sm={6}>
            <img src={aboutLogo} alt="About Us" className={classes.aboutImage} />
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default ImageSlider;

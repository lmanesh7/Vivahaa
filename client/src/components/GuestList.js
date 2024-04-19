import React, { useState, useEffect } from 'react';
import {
  TextField,
  Button,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Container,
  Paper,
  Grid,
} from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';
import axios from '../api/axios';
import VenuesService from '../services/Venues';
import Autocomplete from '@mui/material/Autocomplete';
import { enqueueSnackbar } from 'notistack';

const GuestList = () => {
  const [guests, setGuests] = useState([]);
  const [guestList, setGuestList] = useState([]);
  const [newGuestName, setNewGuestName] = useState('');
  const [newGuestEmail, setNewGuestEmail] = useState('');
  const [commonMessage, setCommonMessage] = useState('');
  const [weddingDate, setWeddingDate] = useState(localStorage.getItem('eventDate'));
  const [eventDate, setEventDate] = useState('');
  const [eventTime, setEventTime] = useState('');
  const [venue, setVenue] = useState(null);
  const [meetingLink, setMeetingLink] = useState('');
  const [venues, setVenues] = useState([]);
  const [venueId, setVenueId] = useState('');
  const [inviterName, setInviterName] = useState('');
  const [attachment, setAttachment] = useState('');
  const userId = sessionStorage.getItem('loggedInUser');

  // Fetch guest data when component mounts
  useEffect(() => {
    const fetchGuestData = async () => {
      try {
        const response = await fetch(`http://localhost:3500/api/guests/${userId}/${weddingDate}`);
        if (!response.ok) {
          throw new Error('Failed to fetch guest data');
        }
        debugger
        const data = await response.json();
        setGuests(data);
        setGuestList(data[0].guests);
      } catch (error) {
        console.error('Error fetching guest data:', error.message);
      }
    };

    fetchGuestData();
  }, []); // Empty dependency array ensures the effect runs only once on mount

  // Fetch venues when component mounts
  useEffect(() => {
    const fetchVenues = async () => {
      try {
        const response = await VenuesService.getAllVenues();
        setVenues(response);
      } catch (error) {
        console.error('Error fetching venues:', error.message);
      }
    };

    fetchVenues();
  }, []);

  const addGuest = () => {
    if (newGuestName.trim() !== '' && newGuestEmail.trim() !== '') {
      const newGuest = { name: newGuestName, email: newGuestEmail };
      setGuestList([...guestList, newGuest]);
      setGuests([...guests, newGuest]);
      setNewGuestName('');
      setNewGuestEmail('');
    }
  };

  const deleteGuest = (index) => {
    const updatedGuests = guestList.filter((_, i) => i !== index);
    setGuestList(updatedGuests);
  };

  const handleSaveData = async () => {

    try {
      const response = await fetch('http://localhost:3500/api/guests', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          guests: guestList.map(({ name, email }) => ({ name, email })),
          eventDate,
          eventTime,
          venueId,
          meetingLink,
          message: commonMessage,
          inviterName: inviterName,
          user: userId,
          attachment: attachment.name
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to save guest data');
      }

      console.log('Guest data saved successfully');
      enqueueSnackbar("Guests data saved successfully", {
        variant: "success",
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });
    } catch (error) {
      console.error('Error saving guest data:', error.message);
      enqueueSnackbar("Error saving guest data", {
        variant: "error",
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });
    }
  };

  const handleSendEmail = async () => {
    try{
    await handleSaveData();
    await axios.post('http://localhost:3500/api/sendemail');
    console.log('Email sent to all recipients');
    enqueueSnackbar("Email sent to all recipients", {
      variant: "success",
      anchorOrigin: {
        vertical: "top",
        horizontal: "right",
      },
    });
  }
  catch(error){
    enqueueSnackbar("Error sending emails", {
      variant: "error",
      anchorOrigin: {
        vertical: "top",
        horizontal: "right",
      },
    });
  }
  };

  const handleVenueChange = (event, newValue) => {
    debugger
    setVenue(newValue);
    setVenueId(newValue._id);
  };
  

  if (sessionStorage.getItem('role') !== '5152') {
    return (
      <h1>You are not authorized to view this page. Please login as a user</h1>
    );
  }

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 3, mt: 3, position: 'relative' }}>
        <Typography variant="h4" gutterBottom>
          Guest List
        </Typography>
        <Typography variant="body2" sx={{ position: 'absolute', top: 10, right: 10 }}>
          Total Guests: {guestList ? guestList.length : guests.length}
        </Typography>
        {weddingDate && (
          <Typography variant="body2" sx={{ mt: 1 }}>
            Guests invited for the wedding dated: {weddingDate}
          </Typography>
        )}
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Name"
              variant="outlined"
              value={newGuestName}
              onChange={(e) => setNewGuestName(e.target.value)}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Email"
              variant="outlined"
              type="email"
              value={newGuestEmail}
              onChange={(e) => setNewGuestEmail(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" onClick={addGuest}>
              Add Guest
            </Button>
          </Grid>
        </Grid>
        <List sx={{ mt: 3 }}>
          {guestList.map((guest, index) => (
            <ListItem key={index} disablePadding>
              <ListItemText primary={guest.name} secondary={guest.email} />
              <ListItemSecondaryAction>
                <IconButton edge="end" onClick={() => deleteGuest(index)}>
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
        <TextField
          fullWidth
          label="Common Message"
          variant="outlined"
          multiline
          rows={3}
          value={commonMessage}
          onChange={(e) => setCommonMessage(e.target.value)}
          sx={{ mt: 3 }}
        />
        <label>Event Details</label>
        <TextField
          fullWidth
          label=""
          type="date"
          variant="outlined"
          value={eventDate}
          onChange={(e) => setEventDate(e.target.value)}
          sx={{ mt: 3 }}
        />
        <TextField
          fullWidth
          label="Event Time"
          type="time"
          variant="outlined"
          value={eventTime}
          onChange={(e) => setEventTime(e.target.value)}
          sx={{ mt: 3 }}
        />
        <Autocomplete
          fullWidth
          value={venue}
          onChange={handleVenueChange}
          options={venues}
          required
          getOptionLabel={(option) => option.businessName}
          renderInput={(params) => <TextField {...params} label="Select Venue" variant="outlined" />}
          sx={{ mt: 3 }}
        />
        <TextField
          fullWidth
          label="Meeting Link"
          variant="outlined"
          value={meetingLink}
          onChange={(e) => setMeetingLink(e.target.value)}
          sx={{ mt: 3 }}
        />
         <TextField
              fullWidth
              label="InviterName"
              variant="outlined"
              value={inviterName}
              onChange={(e) => setInviterName(e.target.value)}
              sx={{ mt: 3 }}
            />

        <input
          type="file"
          onChange={(e) => setAttachment(e.target.files[0])}
          accept=".pdf,.doc,.docx,.jpg,.png"
          sx={{ mt: 3 }}
        />
       
        <Grid container justifyContent="flex-end" sx={{ mt: 3 }}>
          <Grid item>
            <Button variant="outlined" onClick={handleSaveData}>
              Save Data
            </Button>
          </Grid>
          {(guestList[0] && 
          <Grid item sx={{ ml: 2 }}>
            <Button variant="contained" color="primary" onClick={handleSendEmail}>
              Send Email
            </Button>
          </Grid>
           )}
        </Grid>
       
      </Paper>
    </Container>
  );
};

export default GuestList;

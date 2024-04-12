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

const GuestList = () => {
  const [guests, setGuests] = useState([]);
  const [newGuestName, setNewGuestName] = useState('');
  const [newGuestEmail, setNewGuestEmail] = useState('');
  const [commonMessage, setCommonMessage] = useState('');
  const [weddingDate, setWeddingDate] = useState(localStorage.getItem('eventDate'));
  const userId = sessionStorage.getItem('loggedInUser');

  // Fetch guest data when component mounts
  useEffect(() => {
    const fetchGuestData = async () => {
      try {
        const response = await fetch(`http://localhost:3500/api/guests/${userId}/${weddingDate}`);
        debugger
        if (!response.ok) {
          throw new Error('Failed to fetch guest data');
        }
        const data = await response.json();
        data.forEach(guest => {
            setGuests(prevGuests => [...prevGuests, guest]);
          });
          setGuests(data)
        //setCommonMessage(data.message);
      } catch (error) {
        console.error('Error fetching guest data:', error.message);
      }
    };

    fetchGuestData();
  }, []); // Empty dependency array ensures the effect runs only once on mount

  const addGuest = () => {
    if (newGuestName.trim() !== '' && newGuestEmail.trim() !== '') {
      setGuests([...guests, { name: newGuestName, email: newGuestEmail }]);
      setNewGuestName('');
      setNewGuestEmail('');
    }
  };

  const deleteGuest = (index) => {
    const updatedGuests = guests.filter((_, i) => i !== index);
    setGuests(updatedGuests);
  };

  const handleSaveData = async () => {
    try {
      const response = await fetch('http://localhost:3500/api/guests', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          guests: guests.map(({ name, email }) => ({ name, email })),
          eventDate: weddingDate,
          message: commonMessage,
          user: userId,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to save guest data');
      }


      console.log('Guest data saved successfully');
    } catch (error) {
      console.error('Error saving guest data:', error.message);
    }
  };

  const handleSendEmail = async () => {
    // Logic to send email to all recipients
    await handleSaveData();
    await axios.post('http://localhost:3500/api/sendemail')
    console.log('Email sent to all recipients');
  };

  if(sessionStorage.getItem('role')!='5152'){
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
          Total Guests: {guests.length}
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
          {guests.map((guest, index) => (
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
        <Grid container justifyContent="flex-end" sx={{ mt: 3 }}>
          <Grid item>
            <Button variant="outlined" onClick={handleSaveData}>
              Save Data
            </Button>
          </Grid>
          <Grid item sx={{ ml: 2 }}>
            <Button variant="contained" color="primary" onClick={handleSendEmail}>
              Send Email
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default GuestList;

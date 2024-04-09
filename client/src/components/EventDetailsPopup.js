import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Dialog, DialogTitle, DialogContent, TextField, Button, Grid, InputAdornment } from '@material-ui/core';
import EventIcon from '@material-ui/icons/Event';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';

const useStyles = makeStyles(theme => ({
  dialogPaper: {
    borderRadius: theme.spacing(2),
    boxShadow: '0px 4px 30px rgba(0, 0, 0, 0.1)',
    width: '80%', // Adjust the width as needed
  },
  dialogTitle: {
    textAlign: 'center',
    padding: theme.spacing(2),
    backgroundColor: theme.palette.primary.main,
    color: '#fff',
    borderRadius: theme.spacing(2, 2, 0, 0),
  },
  dialogContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2),
    padding: theme.spacing(2),
  },
  textField: {
    '& .MuiInputBase-input': {
      borderRadius: theme.spacing(1),
      backgroundColor: '#f2f2f2',
    },
  },
  submitButton: {
    borderRadius: theme.spacing(1),
  },
}));

const EventDetailsPopup = ({ open, onClose }) => {
  const classes = useStyles();
  const [eventDate, setEventDate] = useState('');
  const [location, setLocation] = useState('');
  const [estimatedGuests, setEstimatedGuests] = useState('');

  const handleSubmit = () => {
    // Save event details to session storage
    localStorage.setItem('eventDate', eventDate);
    localStorage.setItem('location', location);
    localStorage.setItem('estimatedGuests', estimatedGuests);
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      classes={{ paper: classes.dialogPaper }}
    >
      <DialogTitle className={classes.dialogTitle}>Event Details</DialogTitle>
      <DialogContent className={classes.dialogContent}>
        <TextField
          label="Event Date"
          type="date"
          value={eventDate}
          onChange={e => setEventDate(e.target.value)}
          className={classes.textField}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <EventIcon color="primary" />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          label="Location"
          value={location}
          onChange={e => setLocation(e.target.value)}
          className={classes.textField}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LocationOnIcon color="primary" />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          label="Estimated Guests"
          type="number"
          value={estimatedGuests}
          onChange={e => setEstimatedGuests(e.target.value)}
          className={classes.textField}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <PeopleAltIcon color="primary" />
              </InputAdornment>
            ),
          }}
        />
        <Button
          variant="contained"
          color="primary"
          className={classes.submitButton}
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default EventDetailsPopup;

import React, { useState } from 'react';
import { Card, CardContent, Typography, Button } from '@mui/material';
import { styled } from '@mui/system';
import ReplyPage from '../ReplyPage';
import { useNavigate } from 'react-router-dom';


const BookingCardWrapper = styled(Card)(({ theme }) => ({
  backgroundColor: theme.palette.grey[100],
  borderRadius: theme.spacing(2),
  boxShadow: `0 4px 8px ${theme.palette.grey[200]}`,
  transition: '0.3s',
  '&:hover': {
    boxShadow: `0 8px 16px ${theme.palette.grey[300]}`,
  },
}));

const BookingCardContent = styled(CardContent)(({ theme }) => ({
  padding: theme.spacing(2),
}));


const ReplyButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
  },
}));




const BookingCard = ({ booking }) => {
  const navigate = useNavigate();

  const { _id:id,fname, lname, notes, serviceType, phone, email, businessName, eventDate, numberOfDates } = booking;
  const booking_ = booking;
var isUser = false;
  const role = sessionStorage.getItem('role');
  if(role.includes(5152)){
    isUser = true;
    }

  const handleReply = () => {
    // Add logic to handle reply action
    console.log('Reply clicked');
    navigate(`/reply/${id}`,
      {state: { bookingData: booking_ }},
    );
  };

  return (
    <BookingCardWrapper variant="outlined">
      <BookingCardContent>
        <Typography variant="h6" gutterBottom>
          Booking for {booking.businessName} {!isUser && ( <a>received</a>)} {isUser && ( <a>sent</a>)}
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          From: {fname} {lname}
        </Typography>
        <Typography variant="body1" gutterBottom>
          Notes: {notes}
        </Typography>
        <Typography variant="body2" gutterBottom>
          Phone: {phone}
        </Typography>
        <Typography variant="body2" gutterBottom>
          Email: {email}
        </Typography>
        <Typography variant="body2" gutterBottom>
          Event Date: {eventDate}
        </Typography>
        <Typography variant="body2" gutterBottom>
          Number of Days: {numberOfDates}
        </Typography>
       {!isUser &&( <ReplyButton variant="contained" onClick={handleReply}>
          Reply
        </ReplyButton>)}
        {isUser &&( <ReplyButton variant="contained" onClick={handleReply}>
          Follow Up
        </ReplyButton>)}
      </BookingCardContent>
    </BookingCardWrapper>
  );
};

export default BookingCard;

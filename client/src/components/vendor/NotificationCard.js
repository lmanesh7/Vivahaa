import React from 'react';
import { Card, CardContent, Typography, Button } from '@mui/material';

const NotificationCard = ({ notification }) => {
  const { fullName, message,serviceType,  phone, email, businessName } = notification;

  const handleReply = () => {
    // Add logic to handle reply action
    console.log('Reply clicked');
  };

  return (
    <Card variant="outlined">
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Notification regarding {notification.businessName}
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          From: {fullName}
        </Typography>
        <Typography variant="body1" gutterBottom>
          Message: {message}
        </Typography>
        <Typography variant="body2" gutterBottom>
          Phone: {phone}
        </Typography>
        <Typography variant="body2" gutterBottom>
          Email: {email}
        </Typography>
        <Button variant="contained" onClick={handleReply}>
          Reply
        </Button>
      </CardContent>
    </Card>
  );
};

export default NotificationCard;

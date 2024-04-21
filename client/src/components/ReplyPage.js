import React, { useState, useEffect } from 'react';
import { Typography, Button, TextField, Divider } from '@mui/material';
import { styled } from '@mui/system';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ReplyWrapper = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  marginTop: theme.spacing(2),
  borderRadius: theme.spacing(2),
  boxShadow: `0 4px 8px ${theme.palette.grey[200]}`,
  padding: theme.spacing(2),
}));

const MessageWrapper = styled('div')(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

const ReplyPage = () => {
  const id = useParams('id');
  const [vendorReplies, setVendorReplies] = useState([]);
  const [userReplies, setUserReplies] = useState([]);
  const [replyText, setReplyText] = useState('');

  useEffect(() => {
    const fetchReplies = async () => {
      try {debugger
        const vendorResponse = await axios.get(`http://localhost:3500/api/booking/${id.id}`);
        const userResponse = await axios.get(`http://localhost:3500/api/user/booking/${id.id}`);
        const vendorReplies_ = vendorResponse.data.vendorReplies
        const userReplies_ = userResponse.data.userReplies;
        setVendorReplies(vendorReplies_);
        setUserReplies(userReplies_[userReplies_.length-1]);
      } catch (error) {
        console.error('Error fetching replies:', error);
      }
    };
    fetchReplies();
  }, [id]);

  const handleReply = async () => {
    try {
      debugger
      const updatedReplies = [...vendorReplies, replyText];
      
      // Send a POST request to update the vendor replies on the server
      await axios.post(`http://localhost:3500/api/booking/${id.id}/vendor-replies`, {
        vendorReplies: updatedReplies,
      });

      // Update the vendorReplies state with the new replies
      setVendorReplies(updatedReplies);

      // Clear the reply text field
      setReplyText('');
    } catch (error) {
      console.error('Error replying to message:', error);
    }
  };

  return (
    <div>
      <Typography variant="h5" gutterBottom>
         - Chat
      </Typography>
      <ReplyWrapper>
        {vendorReplies.map((reply, index) => (
          <MessageWrapper key={index}>
            <Typography variant="subtitle1">{sessionStorage.getItem('loggedInUsername')}: {reply}</Typography>
            <Divider />
          </MessageWrapper>
        ))}
        {/* {userReplies.map((reply, index) => (
          <MessageWrapper key={index}>
          
            <Typography variant="subtitle1">User: {reply}</Typography>
            <Divider />
          </MessageWrapper>
        ))} */}
        <TextField
          label="Your Reply"
          multiline
          fullWidth
          rows={4}
          variant="outlined"
          value={replyText}
          onChange={(e) => setReplyText(e.target.value)}
          sx={{ marginTop: 2 }}
        />
        <Button variant="contained" onClick={handleReply} sx={{ marginTop: 2 }}>
          Send Reply
        </Button>
      </ReplyWrapper>
    </div>
  );
};

export default ReplyPage;

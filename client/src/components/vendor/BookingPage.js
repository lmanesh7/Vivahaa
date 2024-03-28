import React, { useState, useEffect } from 'react';
import NotificationCard from './NotificationCard'; // Assuming you have created the NotificationCard component
import axios from 'axios';
import BookingCard from './BookingCard';

const BookingPage = () => {
  const [bookings, setBookings] = useState([]);
  const vendorLoggedIn = sessionStorage.getItem('loggedInUser');
  const role = sessionStorage.getItem('role');
  var counter = 0;
  useEffect(() => {
    const fetchBookings = async () => {
      try {debugger
        
        var response = '';
        if(role.includes(5151)){
        response = await axios.get(`http://localhost:3500/api/bookings/${vendorLoggedIn}`);
        }
        else{
          response = await axios.get(`http://localhost:3500/api/user/bookings/${vendorLoggedIn}`);
        }
        setBookings(response.data);
        counter++;
        console.log(response.data)
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    };
    if(!counter){
    fetchBookings();
    }
  }, []);

  return (
    <div>
      <h1>Bookings</h1>
      {bookings.map(booking => (
        <BookingCard key={booking._id} booking={booking} />
      ))}
    </div>
  );
};

export default BookingPage;

import React, { useState, useEffect } from 'react';
import NotificationCard from './NotificationCard'; // Assuming you have created the NotificationCard component
import axios from 'axios';

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState([]);
  const vendorLoggedIn = sessionStorage.getItem('loggedInUser');
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get(`http://localhost:3500/api/notifications/${vendorLoggedIn}`);
        setNotifications(response.data);
        console.log(response.data)
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    fetchNotifications();
  }, []);

  return (
    <div>
      <h1>Notifications</h1>
      {notifications.map(notification => (
        <NotificationCard key={notification._id} notification={notification} />
      ))}
    </div>
  );
};

export default NotificationsPage;

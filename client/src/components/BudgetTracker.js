import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  makeStyles,
} from '@material-ui/core';
import { Add, Delete } from '@material-ui/icons';
import { enqueueSnackbar } from 'notistack';

const useStyles = makeStyles(theme => ({
  circle: {
    width: '200px',
    height: '200px',
    position: 'relative',
  },
  progressBar: {
    fill: 'none',
    strokeWidth: '10',
  },
  cost: {
    stroke: '#FF6384',
    transition: 'stroke-dasharray 0.5s ease',
  },
  paid: {
    stroke: '#36A2EB',
    transition: 'stroke-dasharray 0.5s ease',
  },
  text: {
    dominantBaseline: 'middle',
    textAnchor: 'middle',
    fontSize: '24px',
    fontWeight: 'bold',
    fill: 'black',
  },
}));

const BudgetTracker = () => {
  const classes = useStyles();
  const [budget, setBudget] = useState(0);
  const [totalCost, setTotalCost] = useState(0);
  const [totalPaid, setTotalPaid] = useState(0);
  const [budgetItems, setBudgetItems] = useState([]);
  const userLoggedIn = sessionStorage.getItem('loggedInUser');
  const [newBudgetItem, setNewBudgetItem] = useState({
    name: '',
    cost: 0,
    paid: 0,
  });
  const [eventDate, setEventDate] = useState(new Date(Date.now() + 3 * 30 * 24 * 60 * 60 * 1000)); // Default event date is 3 months from now

 

  useEffect(() => {
    if (userLoggedIn) {
      fetchBudgetData();
    }
  }, [userLoggedIn]);
  

  const fetchBudgetData = async () => {
    try {
      const response = await axios.get(`http://localhost:3500/api/budget/${userLoggedIn}`);
      const { budget, totalCost, totalPaid, items, eventDate_ } = response.data;
      setBudget(budget);
      setTotalCost(totalCost);
      setTotalPaid(totalPaid);
      setBudgetItems(items);
      if(eventDate_){
      setEventDate(eventDate);
      }
    } catch (error) {
      console.error('Error fetching budget data:', error);
    }
  };

  const saveBudgetData = async () => {
    try {
      await axios.post('http://localhost:3500/api/budget', {
        budget,
        totalCost,
        totalPaid,
        items: budgetItems,
        eventDate:eventDate,
        user:userLoggedIn

      });
      enqueueSnackbar('Budget saved successfully', {
        variant: 'success', anchorOrigin: {
          vertical: 'top',
          horizontal: 'right'
        }
      });
    } catch (error) {
      console.error('Error saving budget data:', error);
      enqueueSnackbar('Error saving budget data', {
        variant: 'error', anchorOrigin: {
          vertical: 'top',
          horizontal: 'right'
        }
    });
    }
  };

  const handleAddBudgetItem = () => {
    setBudgetItems([...budgetItems, newBudgetItem]);
    setTotalCost(totalCost + newBudgetItem.cost);
    setTotalPaid(totalPaid + newBudgetItem.paid);
    setNewBudgetItem({ name: '', cost: 0, paid: 0 });
  };

  const handleDeleteBudgetItem = index => {
    const deletedItem = budgetItems[index];
    setTotalCost(totalCost - deletedItem.cost);
    setTotalPaid(totalPaid - deletedItem.paid);
    setBudgetItems(budgetItems.filter((_, i) => i !== index));
  };

  const handleInputChange = (index, field, value) => {
    const updatedItems = [...budgetItems];
    updatedItems[index][field] = value;
    setBudgetItems(updatedItems);
    if (field === 'cost') {
      setTotalCost(updatedItems.reduce((acc, item) => acc + item.cost, 0));
    } else if (field === 'paid') {
      setTotalPaid(updatedItems.reduce((acc, item) => acc + item.paid, 0));
    }
  };
  const formatDate = date => {
    const year = date.getFullYear();
    let month = (date.getMonth() + 1).toString();
    month = month.length === 1 ? '0' + month : month;
    let day = date.getDate().toString();
    day = day.length === 1 ? '0' + day : day;
    return `${year}-${month}-${day}`;
  };
  const handleEventDateChange = e => {
    const selectedDate = new Date(e.target.value);
    const timezoneOffset = selectedDate.getTimezoneOffset();
    const adjustedDate = new Date(selectedDate.getTime() - timezoneOffset * 60 * 1000);
    setEventDate(adjustedDate);
  };

  const progressCost = (totalCost / budget) * 628; // Full circumference of the circle
  const progressPaid = totalCost ? (totalPaid / totalCost) * 628 : 0; // Full circumference of the circle

  if (!userLoggedIn) {
    return (
      <Container maxWidth="md">
        <Typography variant="h5" align="center" gutterBottom>
          User not logged in. Please login to view this page
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="md">
      <Typography variant="h5" align="center" gutterBottom>
        Budget Tracker
      </Typography>
      <Typography variant="h6" align="center" gutterBottom>
        Showing budget for the event date: {eventDate.toDateString()}
      </Typography>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} sm={6}>
          <svg className={classes.circle}>
            <circle
              className={`${classes.progressBar} ${classes.cost}`}
              cx="100"
              cy="100"
              r="90"
              style={{ strokeDasharray: `${progressCost} 628` }}
            />
            <text x="50%" y="50%" className={classes.text}>{`${Math.round((totalCost / budget) * 100)}%`}</text>
          </svg>
          <Typography variant="body1" align="center">
            Total Cost: ${totalCost}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <svg className={classes.circle}>
            <circle
              className={`${classes.progressBar} ${classes.paid}`}
              cx="100"
              cy="100"
              r="90"
              style={{ strokeDasharray: `${progressPaid} 628` }}
            />
            <text x="50%" y="50%" className={classes.text}>{totalCost ? `${Math.round((totalPaid / totalCost) * 100)}%` : 0 + '%'}</text>
          </svg>
          <Typography variant="body1" align="center">
            Total Paid: ${totalPaid}
          </Typography>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Budget"
            type="number"
            value={budget}
            onChange={e => setBudget(e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
        <TextField
  label="Event Date"
  type="date"
  value={formatDate(eventDate)}
  onChange={handleEventDateChange}
  fullWidth
/>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddBudgetItem}
            startIcon={<Add />}
            fullWidth
          >
            Add Budget Item
          </Button>
        </Grid>
      </Grid>
      <List>
        {budgetItems.map((item, index) => (
          <ListItem key={index}>
            <ListItemText>
              <TextField
                label="Name"
                value={item.name}
                onChange={e => handleInputChange(index, 'name', e.target.value)}
              />
              <TextField
                label="Cost"
                type="number"
                value={item.cost}
                onChange={e => handleInputChange(index, 'cost', parseInt(e.target.value))}
              />
              <TextField
                label="Paid"
                type="number"
                value={item.paid}
                onChange={e => handleInputChange(index, 'paid', parseInt(e.target.value))}
              />
            </ListItemText>
            <ListItemSecondaryAction>
              <IconButton edge="end" onClick={() => handleDeleteBudgetItem(index)}>
                <Delete />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
      <Button
        variant="contained"
        color="primary"
        onClick={saveBudgetData}
        fullWidth
      >
        Save Budget
      </Button>
    </Container>
  );
};

export default BudgetTracker;

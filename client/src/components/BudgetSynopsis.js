import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Typography, Grid } from '@material-ui/core';
import MoneyIcon from '@material-ui/icons/Money';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3),
    backgroundColor: '#f5f5f5',
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[3],
    marginBottom: theme.spacing(4),
  },
  title: {
    fontWeight: 'bold',
    marginBottom: theme.spacing(2),
    color: theme.palette.primary.main,
  },
  detail: {
    fontWeight: 'bold',
    display: 'flex',
    alignItems: 'center',
  },
  icon: {
    marginRight: theme.spacing(1),
  },
  arrowIcon: {
    marginLeft: theme.spacing(1),
    fontSize: '1.5rem',
    color: theme.palette.primary.main,
    cursor: 'pointer',
  },
}));

const BudgetSynopsis = ({ totalBudget, totalCost, totalPaid }) => {
  const classes = useStyles();

  const handleRedirect = () => {
    window.location = './budget-tracker';
  };

  return (
    <Paper elevation={3} className={classes.root}>
      <Typography variant="h6" className={classes.title}>
        Budget Tracker Synopsis
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <Typography variant="body1" className={classes.detail}>
            <MoneyIcon className={classes.icon} /> Total Budget:
          </Typography>
        </Grid>
        <Grid item xs={12} sm={8}>
          <Typography variant="body1">${totalBudget}</Typography>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Typography variant="body1" className={classes.detail}>
            <AccountBalanceWalletIcon className={classes.icon} /> Total Cost:
          </Typography>
        </Grid>
        <Grid item xs={12} sm={8}>
          <Typography variant="body1">${totalCost}</Typography>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Typography variant="body1" className={classes.detail}>
            <MonetizationOnIcon className={classes.icon} /> Total Paid:
          </Typography>
        </Grid>
        <Grid item xs={12} sm={8}>
          <Typography variant="body1">${totalPaid}</Typography>
        </Grid>
      </Grid>
      <ArrowForwardIcon className={classes.arrowIcon} onClick={handleRedirect} />
    </Paper>
  );
};

export default BudgetSynopsis;

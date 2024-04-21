import React, { useState, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles'; // Import makeStyles
import { AppBar, Toolbar, Typography, Button, MenuItem, Container, Box, Paper, Popper, Grow, ClickAwayListener, MenuList, colors } from '@mui/material';
import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import UserProfileDropdown from './UserProfileDropdown';
import { Grid } from '@mui/material';
import '../css/PageHeader.css';

const menuItems = [
  { key: 'ideasandadvice', label: 'Ideas and Advice', href: '#' },
  { key: 'planningtools', label: 'Planning Tools', href:'#'},
  { key: 'venues', label: 'Venues', href: '#' },
  { key: 'vendors', label: 'Vendors', href: '#' },
];

const subMenuItems = {
  planningtools: [{
    label:'.', subItems: [
      {label: 'Guest List', href: '/guest-list'},
      {label: 'Check List', href: '/wedding-checklist'},
      {label: 'Budget Tracker', href: '/budget-tracker'}
    ],
   
  }],
  ideasandadvice: [
    { label: 'Wedding Traditions', subItems: [
      { label: 'Hindu Wedding Traditions', href: '/hindu-wedding-traditions' },
      { label: 'Indian wedding traditions', href: '/indian-wedding-traditions' },
      { label: 'what to wear Indian Wedding', href: '/what-to-wear-indian-wedding' },
      { label: 'What to expect bridesman Indian Wedding', href: '/what-to-expect-bridesman-indian-wedding' }
    ]}, 
    { label: 'Themes and Ideas', subItems: [
      { label: 'Flower Arrangement', href: '/flower-arrangement' },
      { label: 'Table Decor', href: '/table-decor' }
    ] },
  ],
};

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  logo: {
    flexGrow: 1,
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'none',
    },
  },
  menu: {
    display: 'flex', // Display menu items horizontally
    alignItems: 'center', // Center menu items vertically
  },
  menuItem: {
    marginRight: theme.spacing(2),
    position: 'relative', // Position menu items relatively
  },
  button: {
    marginLeft: theme.spacing(2),
  },
  subMenu: {
    position: 'absolute', // Position sub-menu
    top: '100%', // Align sub-menu below menu item
    left: 0,
    zIndex: 1, // Ensure sub-menu appears above other content
    minWidth: '200px', // Set minimum width of sub-menu
    backgroundColor: theme.palette.background.paper, // Set background color
    boxShadow: theme.shadows[1], // Apply a light shadow
    borderRadius: theme.shape.borderRadius, // Apply border radius
  },
}));

const PageHeader = () => {
  const { isLogged } = useAuth();
  const [openSubMenu, setOpenSubMenu] = useState(null);
  const closeTimer = useRef(null);
  const classes = useStyles(); // Initialize useStyles

  const handleSubMenuOpen = (event, menuItem) => {
    clearTimeout(closeTimer.current);
    setOpenSubMenu(menuItem);
  };

  const handleSubMenuClose = () => {
    closeTimer.current = setTimeout(() => {
      setOpenSubMenu(null);
    }, 3000);
  };

  const renderSubMenu = (menuItem) => {
    const subItems = subMenuItems[menuItem];
    if (!subItems) return null;
    return (
      <Popper open={openSubMenu === menuItem} anchorEl={document.getElementById(menuItem)} transition disablePortal>
        {({ TransitionProps }) => (
          <Grow {...TransitionProps}>
            <Paper className={classes.subMenu}>
              <ClickAwayListener onClickAway={handleSubMenuClose}>
                <MenuList autoFocusItem={openSubMenu === menuItem}>
                  {subItems.map((subItem, index) => (
                    <MenuItem key={index}>
                      <Typography variant="body2">{subItem.label}</Typography>
                      {subItem.subItems && (
                        <Grid container direction="column">
                          {subItem.subItems.map((subSubItem, subIndex) => (
                            <Grid item key={subIndex}>
                              <MenuItem component={Link} to={subSubItem.href}>
                                <Typography variant="body2">{subSubItem.label}</Typography>
                              </MenuItem>
                            </Grid>
                          ))}
                        </Grid>
                      )}
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    );
  };

  return (
    <div className={classes.root}>
      <AppBar position='fixed' color='primary'>
        <Container maxWidth='lg'>
          <Toolbar>
            <Typography variant='h6' className={classes.logo}>
              <Link to='/' className='logo-text'>Vivahaa</Link>
            </Typography>
            <Box className={classes.menu}>
              {menuItems.map((item) => (
                <div key={item.key} id={item.key} className={classes.menuItem}>
                  <Button
                    color="inherit"
                    onMouseEnter={(e) => handleSubMenuOpen(e, item.key)}
                    onMouseLeave={handleSubMenuClose}
                  >
                    {item.label}
                  </Button>
                  {renderSubMenu(item.key)}
                </div>
              ))}
              {isLogged ? (
                <UserProfileDropdown />
              ) : (
                <>
                  <Button color="inherit" component={Link} to='/login' className={classes.button}>Sign in</Button>
                  <Button color="inherit" variant="contained" component={Link} to='/register' className={classes.button}>Sign up</Button>
                </>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
};

export default PageHeader;

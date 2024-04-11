import React, { useState, useRef } from 'react';
import { AppBar, Toolbar, Typography, Button, MenuItem, Container, Box, Paper, Popper, Grow, ClickAwayListener, MenuList, colors } from '@mui/material';
import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import UserProfileDropdown from './UserProfileDropdown';
import '../css/PageHeader.css';

const menuItems = [
  { key: 'ideasandadvice', label: 'Ideas and Advice', href: '#' },
  { key: 'venues', label: 'Venues', href: '#' },
  { key: 'vendors', label: 'Vendors', href: '#' },
];

const subMenuItems = {
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
  // Add links for other menu items as well if needed
};

const PageHeader = () => {
  const { isLogged } = useAuth();
  const [openSubMenu, setOpenSubMenu] = useState(null);
  const closeTimer = useRef(null);

  const handleSubMenuOpen = (event, menuItem) => {
    clearTimeout(closeTimer.current); // Clear any pending close operation
    setOpenSubMenu(menuItem);
  };

  const handleSubMenuClose = () => {
    closeTimer.current = setTimeout(() => {
      setOpenSubMenu(null);
    }, 3000); // Delayed closing of submenu
  };
  const renderSubMenu = (menuItem) => {
    const subItems = subMenuItems[menuItem];
    if (!subItems) return null;
    return (
      <Popper open={openSubMenu === menuItem} anchorEl={document.getElementById(menuItem)} transition disablePortal>
        {({ TransitionProps }) => (
          <Grow {...TransitionProps}>
            <Paper>
              <ClickAwayListener onClickAway={handleSubMenuClose}>
                <MenuList autoFocusItem={openSubMenu === menuItem}>
                  {subItems.map((subItem, index) => (
                    <MenuItem key={index}>
                      <Typography variant="body2">{subItem.label}</Typography>
                      {subItem.subItems && (
                        <MenuList>
                          {subItem.subItems.map((subSubItem, subIndex) => (
                            <MenuItem key={subIndex} component={Link} to={subSubItem.href}>
                              <Typography variant="body2">{subSubItem.label}</Typography>
                            </MenuItem>
                          ))}
                        </MenuList>
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
    <AppBar position='fixed'>
      <Container maxWidth='lg'>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Typography variant='h6' component='div'>
            <Link to='/' className='logo-text'>Vivahaa</Link>
          </Typography>
          <Box sx={{ display: 'flex', gap: '20px' }}>
            {menuItems.map((item) => (
              <div key={item.key} id={item.key}>
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
                <Button color="primary" component={Link} to='/login'>Sign in</Button>
                <Button color="primary" variant="contained" component={Link} to='/register'>Sign up</Button>
              </>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default PageHeader;

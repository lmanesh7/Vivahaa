import React from 'react';
import { Box, Link, Typography } from '@mui/material';

const Trademark = () => {
  return (
    <Box className='trademark'>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <Typography variant="body2">
            <span>© 2024</span>
            <span style={{ fontWeight: 'bold' }}> Vivahaa</span>
          </Typography>
        </div>
        <div>
          <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
            <Link href="#">Terms & Conditions</Link> | <Link href="#">Privacy Policy</Link>
          </Typography>
        </div>
      </Box>
    </Box>
  );
}

export default Trademark;

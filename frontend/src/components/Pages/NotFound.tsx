import { Box, Typography } from '@mui/material';
import React from 'react';
import Navbar from '../Core/Navbar/Navbar';

export const NotFound: React.FC = () => {
    return (
        <Box component="main" sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100vw',
            height: '100vh',
            paddingTop: '80px'
        }}>
            <Navbar />
            <Typography variant="h1">
                404 NOT FOUND
            </Typography>
        </Box>
    );
}

export default NotFound;
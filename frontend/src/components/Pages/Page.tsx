import { Box, CssBaseline } from '@mui/material';
import React from 'react';
import Navbar from '../Core/Navbar/Navbar';

export const Page: React.FC<PageProps> = ({ children, id, className, withNav, ...props }) => {
    return (
        <Box className={className ? className : ""} {...props} sx={{
            height: '100vh',
            width: '100vw',
            paddingTop: '80px',
            display: 'flex',
            flexDirection: 'column-reverse',
            alignItems: 'center'
        }}>
            <CssBaseline />
            {withNav ? <Navbar /> : <></>}
            <main>
                {children}
            </main>
        </Box>
    );
}

export default Page;
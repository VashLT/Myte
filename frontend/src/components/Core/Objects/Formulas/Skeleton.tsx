import React from 'react';
import { Skeleton as MUISkeleton } from '@mui/material';
import { useTheme } from '@mui/system';

export const Skeleton: React.FC = () => {
    const theme = useTheme();
    return (
        <div>
            <MUISkeleton variant="text" sx={{
                width: '280px',
                height: '80px',
                [theme.breakpoints.up('sm')]: {
                    width: '300px',
                    height: '80px'
                },
            }} />
            <MUISkeleton variant="rectangular" sx={{
                width: '280px',
                height: '300px',
                [theme.breakpoints.up('sm')]: {
                    width: '320px',
                    height: '350px'
                },
            }} />
        </div>
    );
}

export default Skeleton;
import React from 'react';
import { Skeleton as MUISkeleton } from '@mui/material';

export const Skeleton: React.FC = () => {
    return (
        <div>
            <MUISkeleton variant="text" width={210} />
            <MUISkeleton variant="rectangular" width={210} height={118} />
        </div>
    );
}

export default Skeleton;
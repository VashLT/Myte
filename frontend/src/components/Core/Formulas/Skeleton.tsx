import React from 'react';
import { Skeleton as MUISkeleton } from '@mui/material';

export const Skeleton: React.FC = () => {
    return (
        <div>
            <MUISkeleton variant="text" width={280} height={80} />
            <MUISkeleton variant="rectangular" width={280} height={300} />
        </div>
    );
}

export default Skeleton;
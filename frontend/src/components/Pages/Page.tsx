import { CssBaseline } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React from 'react';
import Navbar from '../Core/Navbar/Navbar';

export const Page: React.FC<PageProps> = ({ children, id, className, withNav, ...props }) => {
    return (
        <div className={className ? className : ""} {...props}>
            <CssBaseline />
            {withNav ? <Navbar /> : <></>}
            <main>
                {children}
            </main>
        </div>
    );
}

export default Page;
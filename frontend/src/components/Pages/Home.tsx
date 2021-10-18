import { Button, Typography } from '@mui/material';
import { ThemeContext } from '../Core/Theme/Theme';
import React, { useContext } from 'react';
import Page from './Page';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme: any) => ({
    hero: {
        minHeight: '100vh',
        backgroundImage: 'url(https://i.imgur.com/ip6P7lU.png)',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover'
    }
}));

export const Home: React.FC = () => {
    const classes = useStyles();
    return (
        <Page className={classes.hero} withNav={true}>
            <Typography variant='h1'>
                All your formulas in one place
            </Typography>
            <div id="_overlay"></div>
        </Page>
    );
}

export default Home;
import { Box, Typography } from '@mui/material';
import React from 'react';
import Page from './Page';
import { makeStyles } from '@mui/styles';
import { COLORS } from '../../utils/constants';

const useStyles = makeStyles((theme: any) => ({
    hero: {
        minHeight: '100vh',
        backgroundImage: 'url(https://i.imgur.com/rN99GjR.jpg)',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover'
    }
}));

export const Home: React.FC = () => {
    const classes = useStyles();
    return (
        <Page className={classes.hero} withNav={true}>
            <Box sx={{
                marginTop: '200px'
            }}>
                <Typography
                    variant='h1'
                    sx={{
                        marginTop: '300px',
                        color: 'white',
                        textAlign: "center",
                        "@media (max-width: 1200px)": {
                            margin: "-50px auto 5px auto",
                            fontSize: "clamp(2.5rem, 10vw, 6rem)",
                            width: "90vw"
                        }
                    }}>
                    All your formulas in one place
                </Typography>
                <Typography
                    variant="h3"
                    sx={{
                        marginTop: "30px",
                        color: COLORS.skin,
                        textAlign: "center",
                        "@media (max-width: 1200px)": {
                            marginLeft: "auto",
                            marginRight: "auto",
                            fontSize: "clamp(2rem, 10vw, 4rem)",
                            width: "90vw"
                        }
                    }}
                >
                    Myte is the web app where you can manage your mathematical formulas
                </Typography>
            </Box>
            <div id="_overlay"></div>
        </Page>
    );
}

export default Home;
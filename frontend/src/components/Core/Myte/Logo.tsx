import { Container, Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React from 'react';
import { Link } from 'react-router-dom';

// import { ReactComponent as Myte } from '../../../static/images/logo.svg';
import Myte from '../../../static/images/logo.svg';

const useStyles = makeStyles((theme: Theme) => ({
    text: {
        display: 'inline',
        height: '50px',
        lineHeight: '50px'
    },
    logo: {
        height: '50px'
    }
}));

export const Logo: React.FC<IntrinsicProps & { sx?: { [key: string]: string } }> = ({ className, sx }) => {
    const classes = useStyles();
    if (!sx) {
        sx = {}
    }
    return (
        <Container component={Link} to="/"
            sx={{
                '@media (min-width: 600px)': {
                    pl: 0, pr: 0
                }, ...sx
            }}
        >
            <img src={Myte} className={className || classes.logo} alt="Myte" />
        </Container>
    );
}

export default Logo;

import { Container, Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React from 'react';
import { Link } from 'react-router-dom';

// import { ReactComponent as Myte } from '../../../static/images/logo.svg';
import Myte from '../../../static/images/logo.png';

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

export const Logo: React.FC = () => {
    const classes = useStyles();
    return (
        <Container component={Link} to="/">
            <img src={Myte} className={classes.logo} alt="Myte" />
        </Container>
    );
}

export default Logo;

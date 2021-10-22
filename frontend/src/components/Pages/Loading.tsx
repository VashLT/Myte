import React from 'react';

import { makeStyles } from '@mui/styles';
import { CircularProgress, Theme } from '@mui/material';

import Myte from '../../static/images/logo.svg';
import { COLORS } from '../../utils/constants';

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        width: '100vw',
        height: '100vh',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#171c2f'
    },
    logo: {
        height: '150px'
    },
    loader: {
        marginTop: '20px',
        marginLeft: 'auto',
        marginRight: 'auto'
    }
}));

export const Loading: React.FC = () => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <img src={Myte} className={classes.logo} alt="Myte" />
            <CircularProgress className={classes.loader} sx={{ color: COLORS.orange }} />
        </div>
    );
}


export default Loading;
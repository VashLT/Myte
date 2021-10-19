import React from 'react';
import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Container } from '@mui/material';
import { Typography } from '@mui/material';
import SignUpForm from '../Forms/SignUpForm';

import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/material';

import Myte from '../../static/images/logo.png';

const useStyles = makeStyles((theme: Theme) => ({
    content: {
        margin: '50px 0px 40px 0px',
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    },
    container: {
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
        border: '1px solid lightgray',
        borderRadius: '4px',
        boxShadow: 'rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;'
    },
    iconContainer: {
        position: 'relative',
        margin: '0px',
    },
    avatar: {
        position: 'absolute',
        left: '70%',
        bottom: '5%'
    },
}));

export const SignUp: React.FC = () => {
    const classes = useStyles();

    return (
        <>
            <Container className={classes.container} component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.content}>
                    <div className={classes.iconContainer}>
                        <img src={Myte} alt="myte" style={{ height: '100px' }} />
                        <Avatar className={classes.avatar} sx={{
                            position: 'absolute'
                        }}>
                            <LockOutlinedIcon />
                        </Avatar>
                    </div>
                    <Typography component="h1" variant="h5" sx={{ marginBottom: '20px' }}>
                        Sign up
                    </Typography>
                    <SignUpForm />
                </div>
            </Container>
            <div id="_overlay"></div>
        </>
    );
}

export default SignUp;
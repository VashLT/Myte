import React, { useState, useContext } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';

import axios from 'axios';
import { Link as RouterLink } from 'react-router-dom';
import Alert from '../Core/Alerts/Alert';

import Myte from '../../static/images/logo.png';
import { renderAt } from '../../utils/components';
import { AuthContext } from '../Contexts/Auth';
import { LoadingButton } from '@mui/lab';

const useStyles = makeStyles((theme: Theme) => ({
    container: {
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
        border: '1px solid lightgray',
        borderRadius: '4px',
        boxShadow: 'rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;',
    },
    wrapper: {
        minWidth: '100vw',
        minHeight: '100vh',
        margin: '0'
    },
    iconContainer: {
        position: 'relative',
        margin: '0px',
        cursor: 'pointer'
    },
    avatar: {
        position: 'absolute',
        left: '70%',
        bottom: '5%',
        background: 'linear-gradient(top, rgba(255, 255, 255, .15), rgba(0, 0, 0, .25)), linear-gradient(left top, rgba(255, 255, 255, 0), rgba(255, 255, 255, .1) 50%, rgba(255, 255, 255, 0) 50%, rgba(255, 255, 255, 0)) !important'
    },
}));

export const Login = () => {
    const [usernameState, setUsernameState] = useState<InputState>("initial");
    const [passwordState, setPasswordState] = useState<InputState>("initial");
    const [isLoading, setIsLoading] = useState(false);

    const { setAuth } = useContext(AuthContext);

    const classes = useStyles();
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        setIsLoading(true);

        axios.post('api/user/login/', {
            username: data.get('username'),
            password: data.get('password')
        })
            .then(res => {
                console.log("login", { res })
                let data = (res as unknown as IresponseLogin).data
                if (!data) return;

                if ("success" in data) {
                    console.log("get user", data.user)
                    setAuth(data.user)

                } else if ("failure" in data) {
                    renderAt(
                        <Alert type="error" text={(data as unknown as IresponseLoginFail).failure} />,
                        "_overlay"
                    )
                } else {
                    renderAt(<Alert type="error" text="Internal error" />, "_overlay")
                }

            })
            .catch(err => {
                console.error(err);

                renderAt(<Alert type="error" text={String(err)} />, "_overlay")
            })
            .finally(() => {
                setUsernameState(false);
                setPasswordState(false);
                setIsLoading(false)
            })

    };

    return (
        <div className={classes.wrapper}>
            <Container className={classes.container} component="main" maxWidth="xs">
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <div className={classes.iconContainer} onClick={() => document.getElementById("toHomePage")!.click()}>
                        <img src={Myte} alt="myte" style={{ height: '100px' }} />
                        <Avatar className={classes.avatar} sx={{
                            position: 'absolute'
                        }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <RouterLink to="/" id="toHomePage" />
                    </div>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="username"
                            label="Username"
                            name="username"
                            autoComplete="username"
                            autoFocus
                            helperText={usernameState === false ? "check your username" : ""}
                            error={usernameState === false ? true : false}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            helperText={passwordState === false ? "check your password" : ""}
                            error={passwordState === false ? true : false}
                        />
                        <LoadingButton
                            loading={isLoading}
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign In
                        </LoadingButton>
                        <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2">
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link to="/signup" variant="body2" component={RouterLink}>
                                    {"Don't have an account?"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Copyright sx={{ mt: 8, mb: 4 }} />
            </Container>
            <div id="_overlay"></div>
        </div>
    );
}

const Copyright = (props: any) => {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" to="/" component={RouterLink}>
                Myte
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

export default Login;
import { EMAIL_REGEX, USERNAME_REGEX, PASSWORD_REGEX } from '../../utils/constants';
import React, { useCallback, useContext, useState } from 'react';

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";

import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/material';

import axios from 'axios';
import { render, unmountComponentAtNode } from 'react-dom';
import { Link as RouterLink } from 'react-router-dom';
import Alert from '../Core/Alerts/Alert';
import { Redirect } from 'react-router';
import { AuthContext } from '../Contexts/Auth';
import { renderAt } from '../../utils/components';

const useStyles = makeStyles((theme: Theme) => ({
    form: {
        width: '100%'
    },
    submit: {
        margin: '20px 0px !important'
    },
}));

export const SignUpForm: React.FC = () => {
    const [emailState, setEmailState] = useState<InputState>("initial");
    const [usernameState, setUsernameState] = useState<InputState>("initial");
    const [passwordState, setPasswordState] = useState<InputState>("initial");
    const [passwordMatch, setPasswordMatch] = useState<InputState>("initial");

    const { setAuth } = useContext(AuthContext);

    const classes = useStyles();

    const checkEmail = useCallback((e: React.FormEvent) => {
        const input = e.currentTarget as HTMLInputElement;
        const email = input.value as string;

        console.log({ emailState: email.match(EMAIL_REGEX) })
        setEmailState(email.match(EMAIL_REGEX) ? true : false);
    }, [setEmailState]);

    const checkUsername = useCallback((e: React.FormEvent) => {
        const input = e.currentTarget as HTMLInputElement;
        const username = input.value as string;

        console.log({ userState: username.match(USERNAME_REGEX) })
        setUsernameState(username.match(USERNAME_REGEX) ? true : false);
    }, [setUsernameState]);

    const checkPassword = useCallback((e: React.FormEvent) => {
        const input = e.currentTarget as HTMLInputElement;
        const password = input.value as string;

        console.log({ pwState: password.match(PASSWORD_REGEX) })

        setPasswordState(password.match(PASSWORD_REGEX) ? true : false);

    }, [setPasswordState]);

    const checkPasswordsMatch = useCallback((e: React.FormEvent) => {
        const firstPassword = document.getElementById("password") as HTMLInputElement;
        const input = e.currentTarget as HTMLInputElement;

        setPasswordMatch(firstPassword!.value === input.value);

    }, [setPasswordMatch]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        // call backend

        console.log({
            name: data.get('name'),
            username: data.get('username'),
            email: data.get('email'),
            password: data.get('password'),
        })

        axios.post('api/user/register/', {
            username: data.get('username'),
            first_name: data.get('name'),
            email: data.get('email'),
            password: data.get('password')
        })
            .then(res => {
                console.log("sign up response", { res });
                let data = (res as unknown as IresponseLogin).data;
                if ("failure" in res) {
                    renderAt(
                        <Alert type="error" text={data.failure} caption="Elige otro!" />, "_overlay"
                    );
                    return;
                }
                console.log("user", data.user);
                setAuth(data.user);

            })
            .catch(err => {
                console.error(err)
                renderAt(
                    <Alert type="error" text={String(err)} caption="Elige otro!" />, "_overlay"
                );
                return;
            });
    }

    return (
        <>
            <form className={classes.form} onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            name="name"
                            variant="outlined"
                            // required
                            fullWidth
                            id="name"
                            label="Full Name"
                            autoFocus
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            name="username"
                            variant="outlined"
                            // required
                            fullWidth
                            id="username"
                            label="Username"
                            helperText={usernameState === false ? "Username must have only" : ""}
                            error={usernameState === false ? true : false}
                            onBlur={checkUsername}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            // required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            helperText={emailState === false ? "Invalid email" : ""}
                            error={emailState === false ? true : false}
                            onBlur={checkEmail}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            variant="outlined"
                            // required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            helperText={passwordState === false ? "Password must be at least 8-character long and contain special characters." : ""}
                            error={passwordState === false || passwordMatch === false}
                            onBlur={checkPassword}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            variant="outlined"
                            // required
                            fullWidth
                            name="confirmPassword"
                            label="Confirm Password"
                            type="password"
                            id="confirmPassword"
                            helperText={passwordMatch === false ? "Passwords don't match" : ""}
                            error={passwordMatch === false ? true : false}
                            onBlur={checkPasswordsMatch}
                        />
                    </Grid>
                </Grid>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                >
                    Sign Up
                </Button>
                <Grid container>
                    <Grid item style={{ margin: '0 auto 0 auto' }}>
                        <RouterLink to="/login">
                            <Link href="/login" variant="body2">
                                Already have an account?
                            </Link>
                        </RouterLink>
                    </Grid>
                </Grid>
            </form>
        </>
    );
}

export default SignUpForm;
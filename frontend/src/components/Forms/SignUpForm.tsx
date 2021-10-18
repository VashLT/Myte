import { EMAIL_REGEX, USERNAME_REGEX, PASSWORD_REGEX } from '../../utils/constants';
import React, { useState } from 'react';

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormControlLabel from "@mui/material/FormControlLabel";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";

import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/material';

import axios from 'axios';
import { render, unmountComponentAtNode } from 'react-dom';
import Alert from '../Core/Alerts/Alert';

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

    const classes = useStyles();

    const checkEmail = (e: React.FormEvent) => {
        const input = e.currentTarget as HTMLInputElement;
        const email = input.value as string;

        console.log({ emailState: email.match(EMAIL_REGEX) })
        setEmailState(email.match(EMAIL_REGEX) ? true : false);
    }
    const checkUsername = (e: React.FormEvent) => {
        const input = e.currentTarget as HTMLInputElement;
        const username = input.value as string;

        console.log({ userState: username.match(USERNAME_REGEX) })
        setUsernameState(username.match(USERNAME_REGEX) ? true : false);
    }
    const checkPassword = (e: React.FormEvent) => {
        const input = e.currentTarget as HTMLInputElement;
        const password = input.value as string;

        console.log({ pwState: password.match(PASSWORD_REGEX) })

        setPasswordState(password.match(PASSWORD_REGEX) ? true : false);
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        // call backend
        // axios
        //     .post('/api/user/username', {
        //         username: data.get('username')
        //     })
        //     .then(res => console.log(res))
        console.log({
            name: data.get('name'),
            username: data.get('username'),
            email: data.get('email'),
            password: data.get('password'),
        })

        const alertContainer = document.getElementById("_overlay") as HTMLDivElement;

        unmountComponentAtNode(alertContainer)
        render(
            <Alert type="error" text="El nombre de usuario ya existe." caption="Elige otro!" />,
            alertContainer
        );
    }

    return (
        <>
            <form className={classes.form} onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            name="name"
                            variant="outlined"
                            required
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
                            required
                            fullWidth
                            id="username"
                            label="Username"
                            onBlur={checkUsername}
                        />
                    </Grid>
                    {/* <Grid item xs={12} sm={6}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="lastName"
                                    label="Last Name"
                                    name="lastName"
                                    autoComplete="lname"
                                />
                            </Grid> */}
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            required
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
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            onBlur={checkPassword}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            name="confirmPassword"
                            label="Confirm Password"
                            type="password"
                            id="confirmPassword"
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
                        <Link href="/" variant="body2">
                            Already have an account?
                        </Link>
                    </Grid>
                </Grid>
            </form>
        </>
    );
}

export default SignUpForm;
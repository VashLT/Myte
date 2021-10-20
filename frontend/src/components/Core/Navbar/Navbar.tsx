import React from 'react';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import SortIcon from '@mui/icons-material/Sort';

import { Toggle as ThemeToggle } from '../Theme/Toggle';
import { Collapse, Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import Logo from '../Myte/Logo';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme: Theme) => ({
    hamburger: {
        color: '#fff',
        fontSize: '1rem'
    },
    itemBtn: {
        textDecoration: 'none',
        color: 'white'
    }
}));

export const Navbar: React.FC = () => {
    const classes = useStyles();
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="fixed">
                <Toolbar>
                    <Logo />
                    <Button>
                        <Link to="/login" className={classes.itemBtn}>Login</Link>
                    </Button>
                    <ThemeToggle />

                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <SortIcon className={classes.hamburger} />
                    </IconButton>
                </Toolbar>
            </AppBar>

        </Box>
    );
}

export default Navbar;
import React from 'react';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import SortIcon from '@mui/icons-material/Sort';

import { Toggle as ThemeToggle } from '../Theme/Toggle';
import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import Logo from '../Myte/Logo';
import { Link } from 'react-router-dom';
import { COLORS } from '../../../utils/constants';

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
            <AppBar position="fixed" sx={{ backgroundColor: COLORS.brown }}>
                <Toolbar>
                    <Logo />
                    <Button>
                        <Link to="/login" className={classes.itemBtn}>Login</Link>
                    </Button>
                    <Button>
                        <Link to="/signup" className={classes.itemBtn}>Sign Up</Link>
                    </Button>
                    <ThemeToggle />
                </Toolbar>
            </AppBar>

        </Box>
    );
}

export default Navbar;
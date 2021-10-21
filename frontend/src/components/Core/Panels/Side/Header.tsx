import React from 'react';

import { makeStyles } from '@mui/styles';
import { Box, Theme, Typography, Toolbar, IconButton, Tooltip } from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import { MYTE_VERSION } from '../../../../utils/constants';
import Myte from '../../../../static/images/logo_opt.svg';

const useStyles = makeStyles((theme: Theme) => ({
    container: {
        position: 'relative',
    },
    toggler: {
        top: '50%',
        right: '0',
        transform: 'translate(50%, -50%)',
        height: '30px',
        width: '30px',
        visibility: 'hidden',
        opacity: '0',
        transition: 'opacity 0.2s ease',
        cursor: 'pointer',
    },
    logoContainer: {
        padding: '10px 0px',
        '&:hover': {
            backgroundColor: 'red'
        },
        '& svg': {
            fill: 'white !important'
        }
    },
    logo: {
        height: '60px'
    },
    typoVersion: {
        fontSize: '12px',
        fontWeight: 'bold',
        marginLeft: '10px'
    }
}));

export const Header: React.FC<SidePanelHeaderProps> = ({ panelIsOpen, toggleCallback }) => {
    const classes = useStyles();

    if (panelIsOpen === true) {
        return (
            <Toolbar className={classes.container}>
                <Box className={classes.logoContainer}>
                    <img src={Myte} alt="myte" className={classes.logo} />

                    <Typography className={classes.typoVersion}>
                        v{MYTE_VERSION}
                    </Typography>
                </Box>
                <IconButton
                    className={classes.toggler}
                    color='primary'
                    id="panelToggler"
                    onClick={toggleCallback}
                    sx={{
                        position: 'absolute',
                        zIndex: 500,
                        backgroundColor: 'blue',
                        '&:hover': {
                            backgroundColor: 'darkblue'
                        }
                    }}
                >
                    <ChevronLeft style={{ color: 'white' }} />
                </IconButton>
            </Toolbar>
        )
    }

    return (
        <Toolbar
            className={classes.container}
            sx={{
                padding: '0px !important',
                margin: '10px auto 10px auto',
                width: '100%'
            }}
        >
            <Box className={classes.logoContainer} sx={{
                ml: 'auto',
                mr: 'auto'
            }}>
                <Tooltip title={`v${MYTE_VERSION}`}>
                    <img src={Myte} alt="myte" className={classes.logo} />
                </Tooltip>
            </Box>
            <IconButton
                className={classes.toggler}
                color='primary'
                id="panelToggler"
                onClick={toggleCallback}
            >
                <ChevronRight style={{ color: 'white' }} />
            </IconButton>
        </Toolbar>
    );
}


export default Header;
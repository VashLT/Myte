import React from 'react';

import { makeStyles } from '@mui/styles';
import { Box, Theme, Typography, Toolbar, IconButton, Tooltip } from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import { COLORS, MYTE_VERSION } from '../../../../utils/constants';
import Myte from '../../../../static/images/logo_opt.svg';
import Logo from '../../Myte/Logo';

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
        '& svg': {
            fill: 'white !important'
        },
        // '@media (max-width: 600px)': {
        // [theme.breakpoints.down('sm')]: {
        //     marginLeft: 'auto',
        //     marginRight: 'auto',
        // }
    },
    logo: {
        height: '60px',
    },
    typoVersion: {
        fontSize: '12px',
        marginLeft: '10px !important'
    }
}));

export const Header: React.FC<SidePanelHeaderProps> = ({ panelIsOpen, toggleCallback }) => {
    const classes = useStyles();
    let logoStyle: { [key: string]: any } = {};
    let containerStyle: { [key: string]: any } = {};
    if (!panelIsOpen) {
        logoStyle = {
            marginLeft: 'auto',
            marginRight: 'auto'
        }

        containerStyle = {
            padding: '0 !important'
        }
    }

    const IconComponent = panelIsOpen ? ChevronLeft : ChevronRight;

    return (
        <Toolbar className={classes.container} sx={containerStyle}>
            <Box
                className={classes.logoContainer}
                sx={logoStyle}
            >
                <Tooltip
                    disableHoverListener={panelIsOpen}
                    disableFocusListener={panelIsOpen}
                    title={`v${MYTE_VERSION}`}
                >
                    <Logo className={classes.logo} sx={{ padding: '0 !important' }} />
                </Tooltip>

                {
                    panelIsOpen ? <Typography className={classes.typoVersion}>v{MYTE_VERSION}</Typography>
                        : <></>
                }
            </Box>
            <IconButton
                className={classes.toggler}
                color='primary'
                id="panelToggler"
                onClick={toggleCallback}
                sx={{
                    position: 'absolute',
                    zIndex: 500,
                    backgroundColor: COLORS.orange,
                    '&:hover': {
                        backgroundColor: COLORS.orange_b
                    }
                }}
            >
                <IconComponent style={{ color: 'white' }} />
            </IconButton>
        </Toolbar>
    )
}


export default Header;
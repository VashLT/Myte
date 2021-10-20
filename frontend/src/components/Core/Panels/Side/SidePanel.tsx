import React, { useCallback, useContext, useEffect, useState } from 'react';
import { AppBar, Box, Button, Divider, Drawer, IconButton, List, ListItem, ListItemIcon, ListItemText, Toolbar, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/system';
import Items from './Items';
import SidePanelContext from '../../../Contexts/SidePanel';


import Myte from '../../../../static/images/logo.png';
import { PANEL_MAX_WIDTH, PANEL_MIN_WIDTH } from '../../../Contexts/SidePanel';
import Header from './Header';

const useStyles = makeStyles((theme: Theme) => {
    const mixins = theme.mixins as any;
    return ({
        root: {
            flexGrow: 1,
            height: 430,
            zIndex: 1,
            overflow: 'hidden',
            position: 'relative',
            display: 'flex',
            width: '100%',
        },
        drawer: {
            overflowY: 'visible',
            '&:hover #panelToggler': {
                visibility: 'visible',
                opacity: '1'
            }
        },
        drawerPaper: {
            width: '300px',
            [theme.breakpoints.up('md')]: {
                position: 'relative',
            },
        },
        toolbar: mixins!.toolbar!,
    })
});

export const SidePanel: React.FC = () => {
    const { panelWidth, setPanelWidth, showPanel, setShowPanel } = useContext(SidePanelContext);

    const isOpen = panelWidth > PANEL_MIN_WIDTH;
    const classes = useStyles();

    const handleToggle = useCallback((inMobile = false) => {
        if (!inMobile) {
            setPanelWidth(isOpen ? PANEL_MIN_WIDTH : PANEL_MAX_WIDTH)
        }
        setShowPanel(!showPanel);

    }, [setPanelWidth, setShowPanel, showPanel, isOpen]);

    return (
        <Box
            component="nav"
            // width: {sm: panelWidth}
            sx={{ width: panelWidth, flexShrink: { sm: 0 } }}
            aria-label="mailbox folders"
        >
            {/* Side panel for mobiles */}
            <Drawer
                container={document.body}
                variant="temporary"
                open={showPanel}
                onClose={() => handleToggle(true)}
                ModalProps={{
                    keepMounted: true, // Better open performance on mobile.
                }}
                sx={{
                    display: { xs: 'block', sm: 'none' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: panelWidth },
                }}
            >
                <Header panelIsOpen={isOpen} toggleCallback={() => handleToggle(true)} />
                <Items panelIsOpen={true} inMobile={true} />
            </Drawer>
            {/* Side panel for greater screens */}
            <Drawer
                variant="permanent"
                sx={{
                    display: { xs: 'none', sm: 'block' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: panelWidth },
                }}
                open={showPanel}
                classes={{
                    paper: classes.drawer
                }}
            >
                <Header panelIsOpen={isOpen} toggleCallback={() => handleToggle()} />
                <Divider />
                <Items panelIsOpen={isOpen} />
            </Drawer>
        </Box >
    );

}


export default SidePanel;
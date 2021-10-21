import React, { useCallback, useContext } from 'react';
import { Box, Divider, Drawer } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/system';
import Items from './Items';
import SidePanelContext from '../../../Contexts/SidePanel';


import { PANEL_MAX_WIDTH, PANEL_MIN_WIDTH } from '../../../Contexts/SidePanel';
import Header from './Header';
import { COLORS } from '../../../../utils/constants';

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
            [theme.breakpoints.up('sm')]: {
                '&:hover #panelToggler': {
                    visibility: 'visible',
                    opacity: '1'
                }
            },
            backgroundColor: COLORS.skin + '!important',
            boxShadow: 'rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;',
            overflow: 'visible !important'
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
            sx={{ width: panelWidth, flexShrink: { sm: 0 } }}
            aria-label="side panel"
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
                    overflow: 'visible',
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: panelWidth },
                }}
                classes={{
                    paper: classes.drawer
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
import React, { useContext } from 'react';
import { makeStyles } from '@mui/styles';
import { AppBar, IconButton, Theme, Toolbar } from '@mui/material';
import { Box } from '@mui/system';

import { Menu } from '@mui/icons-material';

import SearchBar from './SearchBar';
import SidePanelContext from '../../../Contexts/SidePanel';
import { Toggle as ThemeToggle } from '../../Theme/Toggle';

const useStyles = makeStyles((theme: Theme) => ({
    container: {}
}));

export const TopPanel: React.FC = () => {
    const { panelWidth, setShowPanel } = useContext(SidePanelContext);
    const classes = useStyles();
    return (
        <Box className={classes.container} sx={{ backgroundColor: 'red' }}>
            <AppBar
                position="fixed"
                sx={{
                    width: { sm: `calc(100% - ${panelWidth}px)` },
                    ml: { sm: `${panelWidth}px` },
                }}
            >
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        aria-label="menu"
                        sx={{
                            display: { xs: 'block', sm: 'none' },
                            color: 'white'
                        }}
                        onClick={() => {
                            console.log("clicked menu")
                            setShowPanel(true)
                        }}
                    >
                        <Menu />
                    </IconButton>
                    {/* <SearchBar /> */}
                    <ThemeToggle />
                </Toolbar>
            </AppBar>
        </Box>
    );
}



export default TopPanel;
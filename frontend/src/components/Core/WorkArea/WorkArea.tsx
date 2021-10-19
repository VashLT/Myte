import React, { useContext } from 'react';

import { Box, Toolbar, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/material';
import SidePanelContext from '../../Contexts/SidePanel';

const useStyles = makeStyles((theme: Theme) => ({
    root: {}
}));

export const WorkArea: React.FC = () => {
    const { panelWidth } = useContext(SidePanelContext)
    const classes = useStyles();
    return (
        <Box
            component="main"
            sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${panelWidth}px)` } }}
        >
            <Toolbar />
            <Typography>
                This is some text, in the work area
            </Typography>
        </Box>
    );
}


export default WorkArea;
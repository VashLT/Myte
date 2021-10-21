import React, { useState } from 'react';

import { makeStyles } from '@mui/styles';
import { Box, TextField, Theme } from '@mui/material';
import LatexMirror from '../Core/Render/LatexMirror';
import LatexProvider from '../Contexts/Latex';
import AddLabel from '../Core/Dialogs/AddLabel';
// import DeleteDialog from '../Core/Formulas/DeleteDialog';
// import BriefNotification from '../Core/Alerts/BriefNotification';

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        backgroundColor: 'red',
        width: '100vw',
        height: '100vh',
        display: 'flex',
        flexWrap: 'wrap',
    },
    mirror: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        maxWidth: '280px',
        width: '90vw',
        overflowY: 'scroll',
        height: '300px',
        backgroundColor: 'white',
        [theme.breakpoints.up('md')]: {
            maxWidth: '400px',
            height: '350px'
        }
    }
}));

export const Test: React.FC = () => {
    const [latex, setLatex] = useState("");
    const classes = useStyles();
    return (
        <LatexProvider>
            <Box className={classes.root}>
                {/* <AddLabel /> */}
                <div id="_overlay"></div>
            </Box>
        </LatexProvider>
    );
}


export default Test;
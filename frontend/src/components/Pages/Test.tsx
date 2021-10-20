import React, { useState } from 'react';

import { makeStyles } from '@mui/styles';
import { Box, TextField, Theme } from '@mui/material';
import LatexMirror from '../Core/Render/LatexMirror';
import LatexProvider from '../Contexts/Latex';
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
                <TextField
                    id="outlined-multiline-static"
                    label="LaTeX code"
                    multiline
                    rows={5}
                    defaultValue={latex || "\\sin{x}"}
                    onChange={(e: React.FormEvent<HTMLTextAreaElement | HTMLInputElement>) => setLatex(e.currentTarget.value)}
                />
                <LatexMirror rawLatex={latex} className={classes.mirror} />
                <div id="_overlay"></div>
            </Box>
        </LatexProvider>
    );
}


export default Test;
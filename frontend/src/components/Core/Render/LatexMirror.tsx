import React from 'react';

import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/material/styles';
import { Paper } from '@mui/material';
import LatexRender from './LatexRender';
const useStyles = makeStyles((theme: Theme) => ({
    mirrorContainer: {
        marginLeft: '20px',
        '@media (max-width:600px)': {
            margin: '20px auto 20px auto',
        }
    }
}));

export const LatexMirror: React.FC<LatexMirrorProps> = ({ rawLatex, className }) => {
    const classes = useStyles();

    return (
        <Paper variant="outlined" className={classes.mirrorContainer + " latex__mirror"}>
            <LatexRender className={className ? className : ""} dynamic={true}>
                {rawLatex}
            </LatexRender>
        </Paper>
    );
}


export default LatexMirror;
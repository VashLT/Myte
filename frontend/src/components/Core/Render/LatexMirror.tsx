import React from 'react';

import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/material/styles';
import { Paper } from '@mui/material';
import { MathJax } from 'better-react-mathjax';

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
        <Paper variant="outlined" className={classes.mirrorContainer}>
            <MathJax className={className ? className : ""} dynamic={true}>
                {`$$\\begin{gather}${rawLatex}\\end{gather}$$`}
            </MathJax>
        </Paper>
    );
}


export default LatexMirror;
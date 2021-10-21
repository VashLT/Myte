import React from 'react';

import { makeStyles } from '@mui/styles';
import { Grid, TextField, Theme } from '@mui/material';
import LatexProvider from '../../../Contexts/Latex';
import LatexMirror from '../../Render/LatexMirror';

const useStyles = makeStyles((theme: Theme) => ({
    mirror: {
        display: 'grid !important',
        alignContent: 'center',
        maxWidth: '280px',
        width: '100%',
        padding: '5px',
        overflowY: 'auto',
        height: '200px',
        backgroundColor: 'white',
        '@media (min-width: 900px)': {
            maxWidth: '400px',
        }
    }
}));

export const EditLatex: React.FC<EditLatexProps> = ({ latex, updateLatex }) => {
    const classes = useStyles();
    return (
        <Grid
            sx={{
                display: 'grid',
                gridTemplateColumns: 'auto 1fr',
                alignItems: 'center',
                columnGap: '10px',
                margin: '10px 2px',
                '@media (max-width: 600px)': {
                    display: 'flex'
                }
            }}
            container md={6} sm={12}>
            <LatexProvider>
                <Grid item>
                    <TextField
                        sx={{
                            minWidth: "90%",
                            '@media (min-width: 600px)': {
                                minWidth: "300px"
                            }
                        }}
                        id="latexInput"
                        label="LaTeX code"
                        multiline
                        rows={5}
                        defaultValue={latex}
                        onChange={(e: MInputEvent) => updateLatex(e.currentTarget.value)}
                        helperText={latex === "" ? "LaTeX can't be empty" : ""}
                        error={latex === ""}
                    />
                </Grid>
                <Grid item>
                    <LatexMirror rawLatex={latex} className={classes.mirror} />
                </Grid>
            </LatexProvider>
        </Grid>
    );
}


export default EditLatex;
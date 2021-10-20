import React, { useContext, useEffect } from 'react';

import { Box, Grid, Toolbar } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/material';
import SidePanelContext from '../../Contexts/SidePanel';
import LatexRender from '../Render/LatexRender';
import { MathJax } from 'better-react-mathjax';
import Skeleton from '../Formulas/Skeleton';
import { mockFormulas } from '../../../utils/mock';
import { render } from 'react-dom';
import Formula from '../Formulas/Formula';

const useStyles = makeStyles((theme: Theme) => ({
    container: {
        backgroundColor: 'darkred',
        [theme.breakpoints.up('lg')]: {
            paddingLeft: '50px'
        }
    },
    grid: {
        justifyContent: 'center',
        width: '100vw',
        [theme.breakpoints.up('lg')]: {
            justifyContent: 'left',
        }
    },
    gridItem: {
        backgroundColor: 'blue',
        border: 'solid 1px white'
    }
}));

export const WorkArea: React.FC = () => {
    const { panelWidth } = useContext(SidePanelContext)
    const classes = useStyles();

    useEffect(() => {
        setTimeout(() => {
            const formulas = mockFormulas;
            render(
                <>
                    {formulas.map(formula => {
                        return (
                            <Grid item justifyContent={'center'} className={classes.gridItem}>
                                <Formula {...formula} />
                            </Grid>
                        );
                    })}
                </>,
                document.getElementById("formulasGrid")
            )
        }, 500)
    });

    return (
        <Box
            component="main"
            className={classes.container}
            sx={{
                flexGrow: 1,
                m: '0',
                pt: '80px',
                overflowX: 'hidden',
            }}
        >
            <Grid
                id="formulasGrid"
                container
                spacing={2}
                className={classes.grid}
            >
                {Array(10).fill(1).map(_ => mapSkeleton())}
            </Grid>
            <Toolbar />
            {/* <MathJax>
                {"some equation: $\\sin{x} \\approx x$"}
            </MathJax> */}
        </Box>
    );
}

const mapSkeleton = () => {
    return (
        <Grid item xs={2} md={3} style={{ backgroundColor: 'blue', border: 'solid 1px white' }}>
            <Skeleton />
        </Grid>
    )
}

export default WorkArea;
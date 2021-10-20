import React, { useEffect } from 'react';

import { Box, Grid } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/material';
import Skeleton from '../Formulas/Skeleton';
import { mockFormulas } from '../../../utils/mock';
import { render } from 'react-dom';
import { FormulaWrapper as Formula } from '../Formulas/Formula';
// import axios from 'axios';
// import BriefNotification from '../Alerts/BriefNotification';

const useStyles = makeStyles((theme: Theme) => ({
    container: {
        backgroundColor: 'darkred',
        [theme.breakpoints.up('lg')]: {
            paddingLeft: '50px',
            paddingRight: '30px'
        },
        width: '100%',
    },
    grid: {
        display: 'grid',
        justifyContent: 'center',
        marginLeft: '0px !important',
        marginBottom: '20px',
        rowGap: '10px',
        [theme.breakpoints.up('lg')]: {
            justifyContent: 'left',
            gridTemplateColumns: 'repeat(auto-fit, 300px)',
            gridTemplateRows: 'repeat(auto-fit, 300px)',
            gridGap: '10px'
        },
        [theme.breakpoints.down('sm')]: {
            width: '100vw'
        }
    },
    gridItem: {
        backgroundColor: 'blue',
        border: 'solid 1px white',
    }
}));

export const WorkArea: React.FC = () => {
    // const { panelWidth } = useContext(SidePanelContext)
    const classes = useStyles();

    useEffect(() => {
        fetchFormulas(classes.gridItem)
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
                className={classes.grid}
            >
                {Array(10).fill(1).map(_ => <Grid className={classes.gridItem} item><Skeleton /></Grid>
                )}
            </Grid>
        </Box>
    );
}

const fetchFormulas = async (className: string) => {
    // await axios
    //     .post("api/formulas/search", {})
    //     .then(res => {
    //         console.log({ res });
    //         let response = res as IformulaResponse;

    //         if (!("formulas" in response.data!)) {
    //             return []
    //         }
    //         const formulas = response.data!.formulas;
    //         render(
    //             <>
    //                 {formulas.map(formula => {
    //                     return (
    //                         <Grid item justifyContent={'center'} className={className}>
    //                             <Formula {...formula} />
    //                         </Grid>
    //                     );
    //                 })}
    //             </>,
    //             document.getElementById("formulasGrid")
    //         )
    //     })
    //     .catch(err => {
    //         console.error(err)
    //         render(
    //             <BriefNotification
    //                 type="main"
    //                 severity="error"
    //                 text="Internal error"
    //             />,
    //             document.getElementById("_overlay")
    //         )
    //     })

    await setTimeout(() => {
        const formulas = mockFormulas;
        render(
            <>
                {formulas.map(formula => {
                    return (
                        <Grid item justifyContent={'center'} className={className}>
                            <Formula {...formula} />
                        </Grid>
                    );
                })}
            </>,
            document.getElementById("formulasGrid")
        )
    }, 500)
};

export default WorkArea;
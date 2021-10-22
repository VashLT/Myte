import React, { memo, useEffect, useState } from 'react';

import { Box, Divider, Grid, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/material';
import Skeleton from '../Formulas/Skeleton';
import { mockFormulas } from '../../../../utils/mock';
import { FormulaWrapper as Formula } from './Formula';
import axios from 'axios';
import BriefNotification from '../../Alerts/BriefNotification';
import { renderAt } from '../../../../utils/components';
import { cookieStorage } from '../../../../utils/storage';

const useStyles = makeStyles((theme: Theme) => ({
    container: {
        [theme.breakpoints.up('md')]: {
            paddingLeft: '50px',
            paddingRight: '30px'
        },
    },
    grid: {
        display: 'grid !important',
        justifyContent: 'center',
        marginLeft: '0px !important',
        marginBottom: '20px',
        gridTemplateColumns: 'repeat(auto-fit, 300px)',
        gridGap: '20px',
        [theme.breakpoints.up('md')]: {
            justifyContent: 'left',
            // gridTemplateRows: 'repeat(auto-fit, 300px)',
        },
        [theme.breakpoints.down('sm')]: {
            width: '100vw !important'
        }
    },
    gridItem: {
        // backgroundColor: 'blue',
        // border: 'solid 1px white',
    },
    title: {
        fontSize: '4rem !important',
        margin: '5px 0 10px 0 !important',
        [theme.breakpoints.down('md')]: {
            fontSize: '2.5rem !important',
            marginLeft: '10px !important'
        }
    }
}));

export const Formulas: React.FC = () => {
    const classes = useStyles();
    const [didFetch, setDidFetch] = useState(false);

    useEffect(() => {
        if (didFetch) return;
        fetchFormulas(() => setDidFetch(true))
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
            <Typography className={classes.title} variant="h1" component="div" gutterBottom>
                Formulas
            </Typography>
            <Divider sx={{ mb: 2 }} />
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

export const fetchFormulas = async (callback?: () => void) => {
    let formulas: [] | IunfmtFormula[] = await axios.post("api/formulas/search/",
        { data: "" },
        {
            headers: { 'X-CSRFToken': cookieStorage.getItem('csrftoken') || "" }
        })
        .then(res => {
            console.log({ res });
            const data = (res as unknown as IresponseFormulas).data

            if (!("formulas" in data)) {
                return []
            }
            return data.formulas;
        })
        .catch(err => {
            console.error(err)
            renderAt(
                <BriefNotification
                    type="main"
                    severity="error"
                    text="Internal error"
                />,
                "_overlay"
            )
            return []
        }) as IunfmtFormula[] | []

    console.log({ formulas })

    // temporary
    if (formulas.length === 0) {
        formulas = mockFormulas;
    }

    insertFormulas(formulas);

    if (callback) {
        callback();
    }
};

export const insertFormulas = (formulas: IunfmtFormula[]) => {
    console.log("insertFormulas", { formulas })
    if (formulas.length === 0) return;
    renderAt(
        <>
            {formulas.map(formula => {
                return (
                    <Grid item justifyContent={'center'}>
                        <Formula
                            idFormula={formula.id_formula}
                            addedAt={formula.added_at}
                            latexCode={formula.latex_code}
                            tags={formula.tags}
                            images={formula.images}
                            category={formula.category}
                            isDeleted={formula.is_deleted}
                            title={formula.title}
                            isCreated={formula.is_created}
                        />
                    </Grid>
                );
            })}
        </>,
        "formulasGrid"
    )
}

export default memo(Formulas);
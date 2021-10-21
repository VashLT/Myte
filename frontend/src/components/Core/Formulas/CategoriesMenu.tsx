import React from 'react';

import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/material';

const useStyles = makeStyles((theme: Theme) => ({
    root: {}
}));

export const CategoriesMenu: React.FC = () => {
    const classes = useStyles();
    return (
        <div className={classes.root}>

        </div>
    );
}


export default CategoriesMenu;
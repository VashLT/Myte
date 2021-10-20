import { Chip } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/material';

const useStyles = makeStyles((theme: Theme) => ({
    tags: {
        display: 'flex',
        flexWrap: 'wrap'
    }
}));

export const Tags: React.FC<{ tags: string[] }> = ({ tags }) => {
    const classes = useStyles();
    return (
        <Box className={classes.tags}>
            {tags.map(tag => <Tag name={tag} />)}
        </Box>
    );
}

export const Tag: React.FC<{ name: string }> = ({ name }) => {
    return (
        <Chip label={name} onClick={() => console.log(`searching ${name} ...`)} />
    )
}

export default Tags;


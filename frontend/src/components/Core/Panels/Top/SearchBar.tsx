import React, { useState } from 'react';

import { makeStyles } from '@mui/styles';
import { Box, IconButton, InputBase, Paper, TextField, Theme } from '@mui/material';
import { Search } from '@mui/icons-material';
import axios from 'axios';

const useStyles = makeStyles((theme: Theme) => ({
    container: {
        backgroundColor: 'primary',
        '&:hover': {
            backgroundColor: 'primary',
            opacity: [0.9, 0.8, 0.7]
        },
        display: 'flex'
    },
    searchIcon: {
        color: 'white'
    }
}));

export const SearchBar: React.FC = () => {
    const classes = useStyles();
    const [search, setSearch] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const searchFormulas = (e: React.FormEvent) => {
        const input = e.currentTarget as HTMLInputElement;
        console.log(`searching '${input.value}' ...`)
        if (input.value === search) return;


    }

    return (
        <Paper
            component="form"
            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
            className={classes.container}
        >
            <IconButton sx={{ p: '10px' }} aria-label="menu">
                <Search />
            </IconButton>
            <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="Search "
                inputProps={{ 'aria-label': 'search' }}
                defaultValue={search}
                onBlur={searchFormulas}
            />
            {/* {
                isLoading ? 
            } */}
        </Paper>
    );
}


export default SearchBar;
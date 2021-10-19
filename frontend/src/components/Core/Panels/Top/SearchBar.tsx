import React, { useState } from 'react';

import { makeStyles } from '@mui/styles';
import { Box, IconButton, TextField, Theme } from '@mui/material';
import { Search } from '@mui/icons-material';

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
    const [isExpanded, setIsExpanded] = useState(false);

    const search = (e: React.FormEvent) => {
        const input = e.currentTarget as HTMLInputElement;
        console.log(`searching '${input.value}' ...`)
        if (input.value === "") {
            setIsExpanded(false)
        }
    }

    const toggleExpand = (e: React.FormEvent) => {
        const input = e.currentTarget as HTMLInputElement;
        if (isExpanded && input.value === "") {
            setIsExpanded(false)
        } else if (isExpanded) {
            console.log("is already expanded")
            return
        }

    }

    return (
        <Box
            className={classes.container}
            sx={{
                width: "auto",
                backgroundColor: 'red'
            }}
        >
            <IconButton>
                <Search className={classes.searchIcon} />
            </IconButton>
            <TextField
                variant="outlined"
                sx={{
                    transform: isExpanded ? "scaleX(1)" : "scaleX(0)"
                }}
                name="search"
                id="search"
                label={isExpanded ? "Search ..." : ""}
                onBlur={search}
                onClick={toggleExpand}
            />
        </Box>
    );
}


export default SearchBar;
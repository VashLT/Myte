import React, { useState } from 'react';

import { makeStyles } from '@mui/styles';
import { Box, CircularProgress, IconButton, InputBase, Paper, TextField, Theme } from '@mui/material';
import { Search } from '@mui/icons-material';
import axios from 'axios';
import { renderAt } from '../../../../utils/components';
import BriefNotification from '../../Alerts/BriefNotification';
import { insertFormulas } from '../../Objects/Formulas/Formulas';

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
        if (input.value === search) return;

        setSearch(input.value)
        setIsLoading(true)

        axios.post("api/formulas/search/", { data: input.value })
            .then(res => {
                console.log("searchFormulas", { res });
                const data = (res as unknown as IresponseFormulas).data;
                if ("error" in data) {
                    renderAt(<BriefNotification text={data.error!} type="main" severity="error" />, "_overlay")
                    return;
                }
                // console.log({ json })
                insertFormulas(data.formulas)
                const length = data.formulas.length

                let text: string;
                if (length === 0) {
                    text = "No formulas matched your search"
                } else if (length === 1) {
                    text = "1 formula matched your search!"
                } else {
                    text = `${length} formulas matched your search!`
                }

                setTimeout(() => {
                    renderAt(<BriefNotification text={text} type="main" severity="error" />, "_overlay")
                }, 500)
            })
            .catch(err => {
                console.error(err);
                renderAt(<BriefNotification text={String(err)} type="main" severity="error" />, "_overlay")
            })
            .finally(() => setIsLoading(false));

    }

    const Icon = isLoading ? <CircularProgress size={20} thickness={2.5} /> : <Search />

    return (
        <Paper
            component="form"
            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
            className={classes.container}
            onSubmit={(e: React.FormEvent<HTMLFormElement>) => e.preventDefault()}
        >
            <IconButton sx={{ p: '10px', cursor: 'pointer' }} aria-label="menu" onClick={searchFormulas}>
                {Icon}
            </IconButton>
            <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="Search "
                inputProps={{ 'aria-label': 'search' }}
                defaultValue={search}
                onBlur={searchFormulas}
            />
        </Paper>
    );
}


export default SearchBar;
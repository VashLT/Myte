import React from 'react';

import { makeStyles } from '@mui/styles';
import { Chip, CircularProgress, IconButton, ListItem, Menu, MenuItem, Theme } from '@mui/material';
import { Box } from '@mui/system';
import { Category as CategoryIcon, Error, Functions } from '@mui/icons-material';
import { useGetCategories } from '../../../hooks/useGetCategories';

const MAX_HEIGHT = 50;

const useStyles = makeStyles((theme: Theme) => ({
    tagsContainer: {
        display: 'flex',
        justifyContent: 'flex-start'
    },
    tagsMenu: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-evenly',
    },
    category: {
        margin: '5px'
    }
}));

export const CategoriesMenu: React.FC<CategoriesMenuProps> = ({ category, updateCategory }) => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const [isLoading, allCategories] = useGetCategories();

    const classes = useStyles();


    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleUpdateCategory = (category: string) => {
        updateCategory(category);
        setAnchorEl(null);
    }

    return (
        <ListItem component={Box} className={classes.tagsContainer}>
            <IconButton sx={{ pl: '0' }} onClick={handleClick}>
                <CategoryIcon />
            </IconButton>
            <Box className={classes.tagsMenu}>
                {category !== "" ? <Chip
                    className={classes.category}
                    label={category}
                    icon={<Functions />}
                    variant="outlined"
                />
                    : <></>
                }
            </Box>
            <Menu
                id="long-menu"
                MenuListProps={{
                    'aria-labelledby': 'long-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={() => setAnchorEl(null)}
                PaperProps={{
                    style: {
                        maxHeight: MAX_HEIGHT * 4.5,
                        width: '20ch',
                    },
                }}
            >
                {isLoading ? <MenuItem><CircularProgress color='primary' /></MenuItem>
                    : ""
                }
                {
                    allCategories.length > 0 ? <CategorySelect categories={allCategories} currentCategory={category} onClick={handleUpdateCategory} />
                        : <MenuItem><Error style={{ color: 'red' }} /></MenuItem>
                }
            </Menu>
        </ListItem>
    );
}

const CategorySelect: React.FC<{ categories: string[], currentCategory: string, onClick: any }> = ({ categories, currentCategory, onClick }) => {
    return (
        <>{categories.map((category, index) => <MenuItem
            key={index}
            disabled={currentCategory === category}
            onClick={() => onClick(category)}
        >
            {category}
        </MenuItem>)}
        </>
    )
}


export default CategoriesMenu;
import { Chip, CircularProgress, IconButton, ListItem, Menu, MenuItem } from '@mui/material';
import { Box } from '@mui/system';
import React, { memo, useState } from 'react';
import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/material';
import { Error, Tag as TagIcon } from '@mui/icons-material';
import { useGetTags } from '../../../hooks/useGetTags';

const TAGS_MENU_MAX_HEIGHT = 50;

const useStyles = makeStyles((theme: Theme) => ({
    tags: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    tag: {
        margin: '2.5px 5px'
    },
    tagsContainer: {
        display: 'flex',
        justifyContent: 'flex-start'
    },
    tagsMenu: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-evenly',
    },
    tagItem: {
        margin: '5px !important'
    }
}));

export const Tags: React.FC<{ tags: string[] }> = ({ tags }) => {
    const classes = useStyles();
    return (
        <Box className={classes.tags}>
            {tags.map(tag => <Tag name={tag} className={classes.tag} />)}
        </Box>
    );
}

export const Tag: React.FC<TagProps> = ({ name, className }) => {
    return (
        <Chip
            className={className ? className : ""}
            label={name}
            onClick={() => console.log(`searching ${name} ...`)}
        />
    )
}



export const TagsMenu: React.FC<TagsMenuProps> = memo(({ tags, handleTagDelete, updateTags }) => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const [isLoading, allTags] = useGetTags();



    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const addTag = (newTag: string) => {
        console.log("addTag", [...tags, newTag])
        updateTags([...tags, newTag])
        // close menu
        setAnchorEl(null);
    }

    const classes = useStyles();
    return (
        <ListItem component={Box} className={classes.tagsContainer}>
            <IconButton sx={{ pl: '0' }} onClick={handleClick}>
                <TagIcon />
            </IconButton>
            <Box className={classes.tagsMenu}>
                {tags.map((tag, index) => <Chip
                    className={classes.tagItem}
                    label={tag}
                    variant="outlined"
                    key={index}
                    onDelete={() => handleTagDelete(tag)}
                />)}
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
                        maxHeight: TAGS_MENU_MAX_HEIGHT * 4.5,
                        width: '20ch',
                    },
                }}
            >
                {isLoading ? <MenuItem><CircularProgress color='primary' /></MenuItem>
                    : ""
                }
                {
                    allTags.length > 0 ? <TagSelect tags={allTags} usedTags={tags} onClick={addTag} />
                        : <MenuItem><Error style={{ color: 'red' }} /></MenuItem>
                }
            </Menu>
        </ListItem>
    )
});

const TagSelect: React.FC<{ tags: string[], usedTags: string[], onClick: any }> = ({ tags, usedTags, onClick }) => {
    return (
        <>{tags.map((tag, index) => <MenuItem key={index} disabled={(usedTags.filter(usedTag => tag === usedTag)).length > 0} onClick={() => onClick(tag)}>
            {tag}
        </MenuItem>)}
        </>
    )
}

export default Tags;


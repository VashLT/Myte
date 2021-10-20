import { Chip, IconButton, ListItem } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/material';
import { Tag as TagIcon } from '@mui/icons-material';

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
        margin: '5px'
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

export const TagsMenu: React.FC<TagsMenuProps> = ({ tags, handleTagDelete }) => {
    const classes = useStyles();
    return (
        <ListItem component={Box} className={classes.tagsContainer}>
            <IconButton sx={{ pl: '0' }}>
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
        </ListItem>
    )
}

export default Tags;


import React, { memo, useContext, useState } from 'react';
import { Button, Chip, ChipProps, CircularProgress, Divider, IconButton, ListItem, Menu, MenuItem, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/material';
import { Add, Error, Tag as TagIcon } from '@mui/icons-material';
import { useGetTags } from '../../../../hooks/useGetTags';
import AddTag from '../../Dialogs/AddTag';
import { renderAt } from '../../../../utils/components';
import TagContext, { TagProvider } from '../../../Contexts/Tag';

const useStyles = makeStyles((theme: Theme) => ({
    tagsList: {
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
    },
    container: {
        paddingLeft: '30px',
        paddingRight: '30px',
        '@media (max-width: 600px)': {
            width: '100vw',
            alignItems: 'center'
        }
    },
    title: {
        fontSize: '4rem !important',
        margin: '5px 0 10px 0 !important',
        '@media (max-width: 900px)': {
            fontSize: '2.5rem !important',
            marginLeft: '10px !important'
        }
    },
    item: {
        margin: '10px !important',
    }
}));

export const TagsWrapper: React.FC = () => {
    return (
        <TagProvider>
            <Container />
        </TagProvider>
    )
}

export const Container: React.FC = memo(() => {
    const classes = useStyles();
    const [openAddTag, setOpenAddTag] = useState(false);
    const { tags, loading } = useContext(TagContext);

    console.log("Container", { openAddTag, tags, loading });

    return (
        <>
            <Box
                component="main"
                className={classes.container}
                sx={{
                    flexGrow: 1,
                    m: '0',
                    pt: '80px',
                    overflowX: 'hidden'
                }}
            >
                <Typography className={classes.title} variant="h1" component="div" gutterBottom>
                    Tags
                </Typography>
                <Divider sx={{ mb: 2 }} />
                {
                    loading ? <CircularProgress sx={{ ml: 'auto', mr: 'auto' }} />
                        : <TagsList tags={tags} className={classes.item} />
                }
                <Divider sx={{ mb: 2 }} />
                <Button startIcon={<Add />} variant="contained" color="success" onClick={() => setOpenAddTag(true)}>
                    Tag
                </Button>
            </Box>
            <AddTag open={openAddTag} setOpen={setOpenAddTag} />
        </>
    );
});

const TAGS_MENU_MAX_HEIGHT = 50;

export const TagsList: React.FC<{ tags: string[], className?: string, sx?: { [key: string]: string } }> = ({ tags, className, sx }) => {
    const classes = useStyles();
    if (!sx) {
        sx = {}
    }
    return (
        <Box className={classes.tagsList} sx={sx}>
            {tags.map(tag => <Tag name={tag} className={className || classes.tag} />)}
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
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
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

export default Tag;
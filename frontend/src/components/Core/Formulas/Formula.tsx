import React from 'react';

import { makeStyles } from '@mui/styles';
import { Card, CardActions, CardContent, CardHeader, IconButton, Menu, MenuItem, Theme } from '@mui/material';
import { MathJax } from 'better-react-mathjax';
import { Delete, Edit, MoreVert } from '@mui/icons-material';
import LatexProvider from '../../Contexts/Latex';
import Tags from './Tags';

const useStyles = makeStyles((theme: Theme) => ({
    container: {
        position: 'relative'
    },
    formulaBody: {
        minWidth: '300px'
    },
    options: {
        position: 'absolute',
        bottom: '10px',
        right: '5px'
    },
}));

export const Formula: React.FC<FormulaProps> = ({ title, latexCode, addedAt, tags, ...props }) => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const open = Boolean(anchorEl);
    const handleMoreClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => { setAnchorEl(null) };

    const classes = useStyles();
    return (
        <LatexProvider>
            <Card
                className={classes.container}
                sx={{ maxWidth: 345 }}
            >
                <CardHeader
                    action={
                        <>
                            <IconButton aria-label="settings" onClick={handleMoreClick}>
                                <MoreVert />
                            </IconButton>
                            <FormulaMenu anchorEl={anchorEl} open={open} handleClose={handleClose} />
                        </>
                    }
                    title={title}
                    subheader={addedAt} />
                <CardContent className={classes.formulaBody} style={{ backgroundColor: 'white' }}>
                    <MathJax>
                        {`$$${latexCode}$$`}
                    </MathJax>
                </CardContent>
                <CardActions disableSpacing>
                    {
                        tags.length > 0 ? <Tags tags={tags} />
                            : <></>
                    }
                </CardActions>
            </Card>
        </LatexProvider>
    );
}

const FormulaMenu: React.FC<FormulaMenuProps> = ({ anchorEl, open, handleClose }) => {
    return (
        <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            PaperProps={{
                elevation: 0,
                sx: {
                    overflow: 'visible',
                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                    mt: 1.5,
                    '& .MuiAvatar-root': {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                    },
                    '&:before': {
                        content: '""',
                        display: 'block',
                        position: 'absolute',
                        top: 0,
                        right: 14,
                        width: 10,
                        height: 10,
                        bgcolor: 'background.paper',
                        transform: 'translateY(-50%) rotate(45deg)',
                        zIndex: 0,
                    },
                },
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
            <MenuItem onClick={() => console.log("editing formula ...")}>
                <Edit /> Edit
            </MenuItem>
            <MenuItem onClick={() => console.log("deleting formula ...")}>
                <Delete /> Delete
            </MenuItem>
        </Menu>
    )
}

export default Formula;
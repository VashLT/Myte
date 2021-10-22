import React, { useContext } from 'react';

import { makeStyles } from '@mui/styles';
import { Card, CardActions, CardContent, CardHeader, IconButton, Menu, MenuItem, Theme } from '@mui/material';
import { Delete, Edit, MoreVert } from '@mui/icons-material';
import LatexProvider from '../../../Contexts/Latex';
import { TagsList } from '../Tags/Tags';
import FormulaContext, { FormulaProvider } from '../../../Contexts/Formula';
import { renderAt } from '../../../../utils/components';
import EditMenu from './EditMenu';
import LatexRender from '../../Render/LatexRender';
import DeleteDialog from './DeleteDialog';

const useStyles = makeStyles((theme: Theme) => ({
    container: {
        position: 'relative',
        display: 'flex',
        flexDirection: 'column'
    },
    formulaBody: {
        width: '280px',
        alignSelf: 'center'
    },
    options: {
        position: 'absolute',
        bottom: '10px',
        right: '5px'
    },
}));

export const FormulaWrapper: React.FC<FormulaProps> = (props) => {
    return (
        <FormulaProvider formula={props}>
            <Formula />
        </FormulaProvider>
    )
}

export const Formula: React.FC = () => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const classes = useStyles();

    const { formula } = useContext(FormulaContext);
    if (Object.keys(formula).length === 0) {
        return <></>
    }
    const { idFormula, title, latexCode, addedAt, tags } = formula as Iformula;

    const open = Boolean(anchorEl);
    const handleMoreClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => { setAnchorEl(null) };

    return (
        <LatexProvider>
            <Card
                className={classes.container}
                sx={{ maxWidth: 345 }}
                id={String(idFormula)}
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
                    <LatexRender>{latexCode}</LatexRender>
                </CardContent>
                <CardActions disableSpacing>
                    {
                        tags.length > 0 ? <TagsList tags={tags} />
                            : <></>
                    }
                </CardActions>
            </Card>
            <div id={"_fO" + idFormula}></div>
        </LatexProvider>
    );
}

const FormulaMenu: React.FC<FormulaMenuProps> = ({ anchorEl, open, handleClose }) => {
    const context = useContext(FormulaContext);
    const containerId = "_fO" + (context.formula as Iformula).idFormula;
    const showEditMenu = () => {
        if (Object.keys(context.formula).length === 0) return;

        renderAt(<EditMenu context={context} />, containerId);
    }
    const showDeleteMenu = () => {
        if (Object.keys(context.formula).length === 0) return;
        renderAt(<DeleteDialog context={context} />, containerId)
    }
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
            <MenuItem onClick={showEditMenu}>
                <Edit /> Edit
            </MenuItem>
            <MenuItem onClick={showDeleteMenu}>
                <Delete /> Delete
            </MenuItem>
        </Menu >
    )
}


export default FormulaWrapper;
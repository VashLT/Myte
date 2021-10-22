import React, { useContext } from 'react';

import { makeStyles } from '@mui/styles';
import { Card, CardActions, CardContent, CardHeader, Divider, IconButton, Menu, MenuItem, Theme } from '@mui/material';
import { Delete, Edit, MoreVert } from '@mui/icons-material';
import LatexProvider from '../../../Contexts/Latex';
import { TagsList } from '../Tags/Tags';
import FormulaContext, { FormulaProvider } from '../../../Contexts/Formula';
import { renderAt } from '../../../../utils/components';
import EditMenu from './EditMenu';
import LatexRender from '../../Render/LatexRender';
import DeleteDialog from './DeleteDialog';
import { COLORS } from '../../../../utils/constants';

const useStyles = makeStyles((theme: Theme) => ({
    container: {
        backgroundColor: 'transparent !important',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px !important'
    },
    formulaBody: {
        width: '100%',
        alignSelf: 'center',
        display: 'flex !important',
        alignItems: 'center !important',
        justifyContent: 'center !important',
        backgroundColor: 'white !important'
    },
    options: {
        position: 'absolute',
        bottom: '10px',
        right: '5px'
    },
    dateText: {
        fontSize: '12px',
        margin: '0',
        color: 'lightgray'
    },
    tagsContainer: {
        backgroundColor: 'white !important'
    }
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
    const { idFormula, title, latexCode, addedAt, tags, isCreated } = formula as Iformula;

    const open = Boolean(anchorEl);
    const handleMoreClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => { setAnchorEl(null) };

    return (
        <LatexProvider>
            <Card
                className={classes.container}
                sx={{ maxWidth: 345, height: '100%', '& .MuiCardHeader-action': { alignSelf: 'center !important' } }}
                id={String(idFormula)}
            >
                <CardHeader
                    action={isCreated ?
                        <>
                            <IconButton aria-label="settings" onClick={handleMoreClick}>
                                <MoreVert style={{ color: 'white' }} />
                            </IconButton>
                            <FormulaMenu anchorEl={anchorEl} open={open} handleClose={handleClose} />
                        </>
                        : <></>
                    }
                    title={title}
                    subheader={<p className={classes.dateText}>{addedAt.split("T")[0]} </p>}
                    sx={{ height: '20%', backgroundColor: COLORS.blue, color: 'white !important' }}
                />
                <Divider />
                <CardContent className={classes.formulaBody + " formula-body__part"} sx={{ height: '60%' }}>
                    <LatexRender>{latexCode}</LatexRender>
                </CardContent>
                <CardActions disableSpacing sx={{ height: '20%' }} className={classes.tagsContainer + " formula-body__part"}>
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
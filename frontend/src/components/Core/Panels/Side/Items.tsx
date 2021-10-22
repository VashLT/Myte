import { AccountCircle, AddCircle, Category, Label, Logout } from '@mui/icons-material';
import { ListItem, ListItemIcon, ListItemText, Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React, { memo, useContext } from 'react';
import { Link } from 'react-router-dom';
import { renderAt } from '../../../../utils/components';
import { logout } from '../../../../utils/funcs';
import { AuthContext } from '../../../Contexts/Auth';
import AddFormula from '../../Dialogs/AddFormula';

const showAddFormulaMenu = () => {
    console.log("showing up add formula menu ...")
    renderAt(<AddFormula />, "_overlay");
}

const useStyles = makeStyles((theme: Theme) => ({
    itemsContainer: {
        '& .MuiSvgIcon-root': {
            transform: 'scale(1.4)'
        },
        '& .MuiButtonBase-root': {
            height: '50px'
        },
        '& .MuiListItemText-root span': {
            fontSize: '18px'
        }
    }
}));


export const Items: React.FC<{ panelIsOpen: boolean, inMobile?: boolean }> = ({ panelIsOpen, inMobile }) => {
    const classes = useStyles();
    const { username } = useContext(AuthContext).auth;

    let itemStyles = {}
    if (!panelIsOpen) {
        itemStyles = {
            justifyContent: 'center !important',
            transition: 'all 0.15s ease',
            '.MuiListItemIcon-root': {
                minWidth: '0 !important'
            }
        }
    }

    return (
        <div className={classes.itemsContainer}>
            <ListItem button onClick={showAddFormulaMenu} sx={itemStyles}>
                <ListItemIcon>
                    <AddCircle />
                </ListItemIcon>
                {panelIsOpen ? <ListItemText primary="Add Formula" /> : <></>}
            </ListItem>
            <ListItem button sx={itemStyles}>
                <ListItemIcon>
                    <Category />
                </ListItemIcon>
                {panelIsOpen ? <ListItemText primary="List Categories" /> : <></>}
            </ListItem>
            <ListItem button onClick={() => document.getElementById("goTags")!.click()} sx={itemStyles}>
                <ListItemIcon>
                    <Label />
                </ListItemIcon>
                {panelIsOpen ? <ListItemText primary="Tags" /> : <></>}
                <Link to="/tags" id="goTags" />
            </ListItem>
            {
                inMobile ? <>
                    <ListItem button component={Link} to={`/${username}`}>
                        <ListItemIcon>
                            <AccountCircle />
                        </ListItemIcon>
                        <ListItemText primary="Profile" />
                    </ListItem>
                    <ListItem
                        button
                        sx={{ mt: 'auto' }}
                        onClick={logout}
                    >
                        <ListItemIcon>
                            <Logout />
                        </ListItemIcon>
                        <ListItemText primary="Logout" />
                    </ListItem>
                </> : <></>
            }
        </div>
    );
}

export default memo(Items);
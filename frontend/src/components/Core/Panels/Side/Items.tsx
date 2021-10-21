import { AccountCircle, AddCircle, Category, Label, Logout } from '@mui/icons-material';
import { ListItem, ListItemIcon, ListItemText, Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React, { memo, useContext } from 'react';
import { Link } from 'react-router-dom';
import { renderAt } from '../../../../utils/components';
import { AuthContext } from '../../../Contexts/Auth';
import AddFormula from '../../Dialogs/AddFormula';
import AddLabel from '../../Dialogs/AddLabel';

const showAddFormulaMenu = () => {
    console.log("showing up add formula menu ...")
    renderAt(<AddFormula />, "_overlay");
}

const showAddLabelMenu = () => {
    renderAt(<AddLabel />, "_overlay");
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

    return (
        <div className={classes.itemsContainer}>
            <ListItem button onClick={showAddFormulaMenu}>
                <ListItemIcon>
                    <AddCircle />
                </ListItemIcon>
                {panelIsOpen ? <ListItemText primary="Add Formula" /> : <></>}
            </ListItem>
            <ListItem button>
                <ListItemIcon>
                    <Category />
                </ListItemIcon>
                {panelIsOpen ? <ListItemText primary="List Categories" /> : <></>}
            </ListItem>
            <ListItem button onClick={showAddLabelMenu}>
                <ListItemIcon>
                    <Label />
                </ListItemIcon>
                {panelIsOpen ? <ListItemText primary="Add Label" /> : <></>}
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
                        component={Link}
                        to='/logout'
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
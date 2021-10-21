import { AccountCircle, AddCircle, Category, Label, Logout } from '@mui/icons-material';
import { ListItem, ListItemIcon, ListItemText } from '@mui/material';
import React, { useContext } from 'react';
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

export const Items: React.FC<{ panelIsOpen: boolean, inMobile?: boolean }> = ({ panelIsOpen, inMobile }) => {
    const { username } = useContext(AuthContext).auth;
    return (
        <div>
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

export default Items;
import { AccountCircle, AddCircle, Category, Label, Logout } from '@mui/icons-material';
import { ListItem, ListItemIcon, ListItemText } from '@mui/material';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../Contexts/Auth';

export const Items: React.FC<{ panelIsOpen: boolean, inMobile?: boolean }> = ({ panelIsOpen, inMobile }) => {
    const { username } = useContext(AuthContext).auth;
    return (
        <div>
            <ListItem button>
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
            <ListItem button>
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
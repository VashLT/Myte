import { AddCircle, Category, Label } from '@mui/icons-material';
import { ListItem, ListItemIcon, ListItemText } from '@mui/material';
import React from 'react';

export const Items: React.FC<{ panelIsOpen: boolean }> = ({ panelIsOpen }) => {
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
        </div>
    );
}

export default Items;
import { Inbox, Star } from '@mui/icons-material';
import { ListItem, ListItemIcon, ListItemText } from '@mui/material';
import React from 'react';

export const Items: React.FC = () => {
    return (
        <div>
            <ListItem button>
                <ListItemIcon>
                    <Inbox />
                </ListItemIcon>
                <ListItemText primary="Inbox" />
            </ListItem>
            <ListItem button>
                <ListItemIcon>
                    <Star />
                </ListItemIcon>
                <ListItemText primary="Starred" />
            </ListItem>
        </div>
    );
}

export default Items;
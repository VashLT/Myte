import React, { useCallback, useEffect, useState } from 'react';
import { Divider, Drawer, List } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/system';
import Items from './Items';

const DRAWER_WIDTH = 240; // pixels

const useStyles = makeStyles((theme: Theme) => ({
    dragger: {
        width: '5px',
        cursor: 'ew-resize',
        padding: '4px 0 0',
        borderTop: '1px solid #ddd',
        position: 'absolute',
        top: '0',
        left: '0',
        bottom: '0',
        zIndex: 100,
        backgroundColor: '#f4f7f9',
    },
    drawerPaper: {
        width: DRAWER_WIDTH,
        // [theme.breakpoints.up('md')]: {
        // position: 'relative',
        // },
    },
    // toolbar: theme.mixins!.toolbar
    toolbar: {

    }
}));

export const SidePanel: React.FC = () => {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [isResizing, setIsResizing] = useState(false);
    const [lastDownX, setLastDownX] = useState(0);
    const [newWidth, setNewWidth] = useState(0);

    const classes = useStyles();

    const handleToggle = () => setMobileOpen(!mobileOpen);

    const handleMouseMove = useCallback((e: MouseEvent) => {
        if (!isResizing) return;

        let offsetRight = document.body.offsetWidth - (e.clientX - document.body.offsetLeft);
        let minWidth = 50;
        let maxWidth = 600;
        if (offsetRight > minWidth && offsetRight < maxWidth) {
            setNewWidth(offsetRight);
        }
    }, [setNewWidth, isResizing]);

    const handleMouseUp = () => {
        if (!isResizing) {
            setIsResizing(false);
        }
    }

    const handleMouseDown = (e: React.MouseEvent) => {
        setIsResizing(true);
        setLastDownX(e.clientX)
    }

    useEffect(() => {
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    }, []);

    const drawer = (
        <div>
            <div className={classes.toolbar} />
            <Divider />
            <List>
                <Items />
            </List>
        </div>
    );

    return (
        <div>
            <Drawer
                variant="temporary"
                anchor="left"
                open={mobileOpen}
                onClose={handleToggle}
                classes={{
                    paper: classes.drawerPaper,
                }}
                ModalProps={{
                    keepMounted: true
                }}
                PaperProps={{ style: { width: newWidth } }}
            >
                <div
                    id="dragger"
                    onMouseDown={handleMouseDown}
                    className={classes.dragger}
                >
                    {drawer}
                </div>
            </Drawer>
        </div>
    );
}


export default SidePanel;
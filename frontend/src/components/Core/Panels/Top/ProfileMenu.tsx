import React, { useContext } from 'react';

import { makeStyles } from '@mui/styles';
import { Avatar, Box, Divider, ListItem, ListItemIcon, Menu, MenuItem, Theme } from '@mui/material';
import { AuthContext } from '../../../Contexts/Auth';
import { DEFAULT_AVATAR_URL } from '../../../../utils/constants';
import { Logout } from '@mui/icons-material';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme: Theme) => ({
    profileMenu: {
        marginLeft: 'auto'
    }
}));

export const ProfileMenu: React.FC = () => {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const { auth } = useContext(AuthContext);
    const avatarUrl = 'avatarUrl' in auth && auth.avatarUrl !== '' ? auth.avatarUrl : DEFAULT_AVATAR_URL;

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Box className={classes.profileMenu}>
            <Avatar alt={`${auth.username}'s avatar`} src={avatarUrl} sx={{ cursor: 'pointer' }} onClick={handleClick} />
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
                <MenuItem>
                    {auth.username}
                </MenuItem>
                <MenuItem LinkComponent={Link}>
                    <Avatar /> Profile
                </MenuItem>
                <Divider />
                <MenuItem>
                    <ListItemIcon>
                        <Logout fontSize="small" />
                    </ListItemIcon>
                    Logout
                </MenuItem>

            </Menu>
        </Box >
    );
}


export default ProfileMenu;
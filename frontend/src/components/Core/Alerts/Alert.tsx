import React, { useState } from 'react';

import { makeStyles } from '@mui/styles';
import { AlertTitle, Alert as AlertMUI, Theme, Collapse, IconButton } from '@mui/material';
import { capitalize } from '../../../utils/funcs';
import { Close } from '@mui/icons-material';
const useStyles = makeStyles((theme: Theme) => ({
    alert: {
        position: 'fixed',
        top: '0px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '100%',
        zIndex: 9999
    }
}));
export const Alert: React.FC<AlertProps> = ({ type, text, title, caption }) => {
    const [open, setOpen] = useState(true);
    const classes = useStyles();
    return (
        <Collapse in={open}>
            <AlertMUI
                variant="filled"
                className={classes.alert}
                severity={type}
                action={
                    <IconButton
                        aria-label="close"
                        color="inherit"
                        size="small"
                        onClick={() => {
                            setOpen(false);
                        }}
                    >
                        <Close fontSize="inherit" />
                    </IconButton>
                }
            >
                <AlertTitle>{title ? title : capitalize(type)}</AlertTitle>
                {text}. {caption ? <>— <strong>{caption}</strong></> : <></>}
            </AlertMUI>
        </Collapse>
    );
}

export default Alert;
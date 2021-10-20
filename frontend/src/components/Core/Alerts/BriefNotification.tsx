import { Snackbar } from '@mui/material';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import React, { useState } from 'react';

export const BriefNotification: React.FC<BriefNotificationProps> = ({ type, severity, text }) => {
    const [open, setOpen] = useState(true);

    const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    return (
        <Snackbar
            anchorOrigin={
                type === "main" ? { vertical: 'top', horizontal: 'center' }
                    : { vertical: 'bottom', horizontal: 'left' }}
            open={open}
            autoHideDuration={6000}
        >
            <Alert variant="filled" onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
                {text}
            </Alert>
        </Snackbar>
    );
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default BriefNotification;
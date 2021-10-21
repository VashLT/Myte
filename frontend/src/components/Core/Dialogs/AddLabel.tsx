import React, { useCallback, useState } from 'react';

import { makeStyles } from '@mui/styles';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Theme } from '@mui/material';
import { Add } from '@mui/icons-material';
import axios from 'axios';
import { LoadingButton } from '@mui/lab';
import { renderAt } from '../../../utils/components';
import BriefNotification from '../Alerts/BriefNotification';

const useStyles = makeStyles((theme: Theme) => ({
    root: {}
}));

export const AddLabel: React.FC = () => {
    const [open, setOpen] = useState(true);
    const [label, setLabel] = useState("");
    const [loading, setLoading] = useState(false);
    const classes = useStyles();

    const saveLabel = useCallback(async () => {
        await axios.post("/api/label/add", { label })
            .then(res => {
                console.log("saveLabel", { res })
                const data = (res as unknown as IresponseState).data;
                if ("error" in data) {
                    renderAt(<BriefNotification type="main" severity="error" text={data.error!} />, "_overlay");
                } else {
                    renderAt(<BriefNotification type="main" severity='success' text={data.success!} />, "_overlay")
                    setOpen(false);
                }

            })
            .catch(err => {
                console.error(err)
                renderAt(<BriefNotification type="main" severity="error" text={String(err)} />, "_overlay");
            })
            .finally(() => setLoading(false))
    }, [setLoading, setOpen, label])

    const handleClose = () => {
        setLoading(true)
        saveLabel()
    }

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Create Label</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    id="label"
                    label="Label name"
                    type="text"
                    fullWidth
                    defaultValue={label}
                    variant="standard"
                    onChange={(e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) => setLabel(e.currentTarget.value)}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={() => setOpen(false)}>Cancel</Button>
                <LoadingButton loading={loading} disabled={label === ""} variant="contained" color="success" endIcon={<Add />} onClick={handleClose}>Create</LoadingButton>
            </DialogActions>
        </Dialog>
    );
}


export default AddLabel;
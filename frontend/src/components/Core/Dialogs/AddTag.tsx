import React, { useCallback, useContext, useState } from 'react';

import { makeStyles } from '@mui/styles';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Theme } from '@mui/material';
import { Add } from '@mui/icons-material';
import axios from 'axios';
import { LoadingButton } from '@mui/lab';
import { renderAt } from '../../../utils/components';
import BriefNotification from '../Alerts/BriefNotification';
import TagContext from '../../Contexts/Tag';

const useStyles = makeStyles((theme: Theme) => ({
    root: {}
}));

export const AddTag: React.FC<{ open: boolean; setOpen: (state: boolean) => void; }> = ({ open, setOpen }) => {
    const [tag, setTag] = useState("");
    const [loading, setLoading] = useState(false);

    const { addTag } = useContext(TagContext);

    const classes = useStyles();

    const saveTag = useCallback(async () => {
        await axios.post("api/tag/add/", { label: tag })
            .then(res => {
                console.log("saveLabel", { res })
                const data = (res as unknown as IresponseState).data;
                if ("error" in data) {
                    renderAt(<BriefNotification type="main" severity="error" text={data.error!} />, "_overlay");
                } else {
                    renderAt(<BriefNotification type="main" severity='success' text={data.success!} />, "_overlay")
                    setOpen(false);

                    addTag(tag)
                }
            })
            .catch(err => {
                console.error(err)
                renderAt(<BriefNotification type="main" severity="error" text={String(err)} />, "_overlay");
                addTag(tag)
            })
            .finally(() => setLoading(false))
    }, [setLoading, setOpen, tag, addTag])

    const handleClose = () => {
        setLoading(true)
        saveTag()
    }

    return (
        <Dialog open={open} onClose={handleClose} keepMounted={true}>
            <DialogTitle>Create Label</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    id="tag"
                    label="Tag name"
                    type="text"
                    fullWidth
                    defaultValue={tag}
                    variant="standard"
                    onChange={(e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) => setTag(e.currentTarget.value)}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={() => setOpen(false)}>Cancel</Button>
                <LoadingButton loading={loading} disabled={tag === ""} variant="contained" color="success" endIcon={<Add />} onClick={handleClose}>Create</LoadingButton>
            </DialogActions>
        </Dialog>
    );
}


export default AddTag;
import React, { useCallback, useState } from 'react';

import { makeStyles } from '@mui/styles';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, Modal, Theme } from '@mui/material';
import { Close, Delete } from '@mui/icons-material';
import LoadingButton from '@mui/lab/LoadingButton';
import axios from 'axios';
import { render, unmountComponentAtNode } from 'react-dom';
import Alert from '../Alerts/Alert';
import BriefNotification from '../Alerts/BriefNotification';


const useStyles = makeStyles((theme: Theme) => ({
    root: {}
}));

export const DeleteDialog: React.FC<{ context: IformulaContext }> = ({ context }) => {
    const [open, setOpen] = useState(true);
    const [isDisabled, setIsDisabled] = useState(false);
    const [loading, setLoading] = React.useState(false);

    const classes = useStyles();

    const formula = context.formula as Iformula;

    const deleteFormula = useCallback(async () => {
        const container = document.getElementById('_overlay') as HTMLElement;

        unmountComponentAtNode(container);

        await axios
            .post("api/formulas/delete", {
                id: formula.id
            })
            .then(res => {
                console.log({ res })
                if ("error" in res) {
                    render(
                        <Alert type="error" text="Internal error, formula can not be deleted" />,
                        container
                    );
                    setIsDisabled(true);
                    return;
                }
                context.setFormula({})
                setOpen(false)
                render(
                    <BriefNotification type="secondary" severity='success' text="Formula deleted successfully" />,
                    container
                )
            })
            .catch(err => {
                console.error(err);
                render(
                    <Alert type="error" text={String(err)} />,
                    container
                )
                setIsDisabled(true);
            })

        setLoading(false);
    }, [setLoading, formula, context])

    const handleClick = useCallback(() => {
        setLoading(true);
        deleteFormula()
    }, [deleteFormula, setLoading]);

    return (
        <Dialog
            open={open}
            onClose={() => setOpen(false)}
            aria-labelledby="delete-formula"
            aria-describedby="delete-formula"
        >
            <DialogTitle>
                {"Delete Formula"}
                <IconButton
                    aria-label="close"
                    onClick={() => setOpen(false)}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <Close />
                </IconButton>
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    You are about to delete '{formula.title}', are you sure?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <LoadingButton
                    color='error'
                    variant="contained"
                    startIcon={<Delete />}
                    loadingPosition="start"
                    onClick={handleClick}
                    loading={loading}
                    disabled={isDisabled}
                >
                    Delete
                </LoadingButton>
            </DialogActions>
        </Dialog>
    );
}


export default DeleteDialog;
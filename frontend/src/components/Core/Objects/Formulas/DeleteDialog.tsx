import React, { useCallback, useState } from 'react';

import { makeStyles } from '@mui/styles';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, Theme } from '@mui/material';
import { Close, Delete } from '@mui/icons-material';
import LoadingButton from '@mui/lab/LoadingButton';
import axios from 'axios';
import Alert from '../../Alerts/Alert';
import BriefNotification from '../../Alerts/BriefNotification';
import { renderAt } from '../../../../utils/components';
import { cookieStorage } from '../../../../utils/storage';
import { fetchFormulas } from './Formulas';


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
        setLoading(true);
        await axios
            .post("api/formulas/delete/", {
                id_formula: formula.idFormula
            }, { headers: { 'X-CSRFToken': cookieStorage.getItem('csrftoken') || "" } })
            .then(res => {
                console.log({ res })
                const data = (res as unknown as IresponseState).data;
                if (data === "") {
                    context.setFormula({})
                    renderAt(
                        <BriefNotification type="secondary" severity='success' text="Formula deleted successfully" />,
                        "_overlay"
                    )
                } else {
                    renderAt(
                        <Alert type="error" text="Internal error, formula can not be deleted" />,
                        "_overlay"
                    );
                    setIsDisabled(true);
                    return;
                }
            })
            .catch(err => {
                console.error(err);
                renderAt(
                    <Alert type="error" text={String(err)} />,
                    "_overlay"
                )
                setIsDisabled(true);
            })

        await fetchFormulas();
        setOpen(false);
        setLoading(false)

    }, [setLoading, formula, context])

    const deleteFormulaPermanent = useCallback(async () => {
        setLoading(true);
        await axios
            .delete(`api/formulas/${formula.idFormula}/`, { headers: { 'X-CSRFToken': cookieStorage.getItem('csrftoken') || "" } })
            .then(res => {
                console.log({ res })
                const data = (res as unknown as IresponseState).data;
                if ("error" in data) {
                    renderAt(
                        <Alert type="error" text="Internal error, formula can not be deleted" />,
                        "_overlay"
                    );
                    setIsDisabled(true);
                    return;
                }
                context.setFormula({})
                renderAt(
                    <BriefNotification type="secondary" severity='success' text="Formula deleted successfully" />,
                    "_overlay"
                )
            })
            .catch(err => {
                console.error(err);
                renderAt(
                    <Alert type="error" text={String(err)} />,
                    "_overlay"
                )
                setIsDisabled(true);
            })

        await fetchFormulas();
        setOpen(false);
        setLoading(false)
    }, [setOpen, setLoading, context, formula]);

    const handleClick = useCallback((permanent = false) => {
        setLoading(true);
        permanent ? deleteFormulaPermanent() : deleteFormula()
    }, [deleteFormula, setLoading, deleteFormulaPermanent]);

    return (
        <Dialog
            open={open}
            onClose={() => setOpen(false)}
            aria-labelledby="delete-formula"
            aria-describedby="delete-formula"
            className="delete__dialog"
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
                    You are about to delete "{formula.title}", are you sure?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <LoadingButton
                    color='error'
                    variant="outlined"
                    startIcon={<Delete />}
                    loadingPosition="start"
                    onClick={() => handleClick(true)}
                    disabled={isDisabled}
                >
                    Delete perma
                </LoadingButton>
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
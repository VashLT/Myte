import React, { memo, useCallback, useState } from 'react';

import { makeStyles } from '@mui/styles';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, Grid, TextField, Theme } from '@mui/material';
import axios from 'axios';
import { renderAt } from '../../../utils/components';
import BriefNotification from '../Alerts/BriefNotification';
import { FORMULA_TITLE_MAX_CHAR } from '../../../utils/constants';
import Alert from '../Alerts/Alert';
import { TagsMenu } from '../Formulas/Tags';
import CategoriesMenu from '../Formulas/CategoriesMenu';
import { Add, Delete, Edit } from '@mui/icons-material';

import { grey } from '@mui/material/colors';
import { LoadingButton } from '@mui/lab';
import { EditLatex } from '../Formulas/Latex';

const useStyles = makeStyles((theme: Theme) => ({
    closeButton: {
        outlineColor: grey[500],
        color: grey[500],
        '& svg': {
            fill: grey[500]
        },
        '&:focus': {
            outlineColor: grey[700]
        }
    },
    noClickBackdrop: {
        pointerEvents: "none"
    },
    dialog: {
        maxWidth: '98vw !important'
    }
}));

export const AddFormula: React.FC = memo(() => {
    const [title, setTitle] = useState<string | null>(null);
    const [latex, setLatex] = useState("\\text{write some LaTeX: } e^{2\\pi\\theta} + 1 = 0  \\\\ \\sin{x} \\approx x");
    const [tags, setTags] = useState<string[] | []>([]);
    const [category, setCategory] = useState("");


    const [open, setOpen] = useState(true);
    const [openCloseDialog, setOpenCloseDialog] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const classes = useStyles();

    const saveFormula = useCallback(async () => {
        await axios.post("/api/formulas/add")
            .then(res => {
                console.log("saveFormula", { res });
                const data = (res as unknown as IresponseState).data;
                if ("error" in data) {
                    renderAt(<BriefNotification text={data.error!} type="main" severity='error' />, "_overlay")
                } else {
                    renderAt(<BriefNotification text={data.success!} type="main" severity='success' />, "_overlay")
                }
            })
            .catch(err => {
                console.error(err)
                renderAt(<BriefNotification text={String(err)} type="main" severity='error' />, "_overlay");

            })
            .finally(() => {
                setOpen(false);
                setIsLoading(false);
            })
    }, [setIsLoading]);

    const handleClose = () => {
        setIsLoading(true)
        saveFormula()
    }

    const handleTagDelete = useCallback((targetTag: string) => {
        setTags(tags.filter(tag => tag !== targetTag))
    }, [setTags, tags])

    return (
        <Dialog
            classes={{
                paper: classes.dialog
            }}
            open={open}
            onClose={() => setOpenCloseDialog(true)}
            keepMounted={true}
        >
            <DialogTitle>Create Formula</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    id="title"
                    label="Title"
                    type="text"
                    fullWidth
                    defaultValue={title}
                    variant="standard"
                    onChange={checkCharCount}
                    onBlur={(e: MInputEvent) => setTitle(e.currentTarget.value)}
                    helperText={title === "" ? "Title can't be empty" : ""}
                    error={title === ""}
                />
                <Divider />
                <EditLatex latex={latex} updateLatex={setLatex} />
                <Divider />
                <TagsMenu handleTagDelete={handleTagDelete} tags={tags} updateTags={setTags} />
                <Divider />
                <CategoriesMenu category={category} updateCategory={setCategory} />
            </DialogContent>
            <DialogActions>
                <Button onClick={() => setOpen(false)}>Cancel</Button>
                <LoadingButton
                    loading={isLoading}
                    onClick={handleClose}
                    variant="contained"
                    color="success"
                    disabled={title === "" && latex === ""}
                    endIcon={<Add />}
                >
                    Create
                </LoadingButton>
            </DialogActions>

            <CloseDialog show={openCloseDialog} callback={setOpen} close={setOpenCloseDialog} />
        </Dialog>
    );
});

const CloseDialog: React.FC<{ show: boolean; callback: (close: boolean) => void, close: (close: boolean) => void }> = ({ show, callback, close }) => {
    const classes = useStyles();
    const handleClose = () => {
        close(false);
        callback(false);
    }
    return (
        <Dialog
            open={show}
        // onClose={() => setOpen(false)}
        // onBackdropClick={() => false}
        >
            <DialogTitle>{"Formula Creation in Process ..."}</DialogTitle>
            <DialogContent>
                <DialogContentText>The formula won't be created, click <strong>Continue</strong> to continue creating.</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button className={classes.closeButton} variant="outlined" startIcon={<Delete />} onClick={handleClose}>Close</Button>
                <Button variant="contained" startIcon={<Edit />} onClick={() => close(false)}>Continue</Button>
            </DialogActions>
        </Dialog>
    )
}

const checkCharCount = (e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const text = e.currentTarget.value;
    if (text.length > FORMULA_TITLE_MAX_CHAR) {
        console.log("text exceddeed max chars")
        renderAt(<Alert type="warning" text="Title has exceeded max number of characters" />, "_overlay")
        e.preventDefault();
    }
}

export default AddFormula;
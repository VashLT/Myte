import React, { useState, useCallback } from 'react';

import { makeStyles } from '@mui/styles';
import { Box, Dialog, TextField, Theme } from '@mui/material';

import LoadingButton from '@mui/lab/LoadingButton';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { renderAt } from '../../../utils/components';
import Alert from '../Alerts/Alert';
import axios from 'axios';
import BriefNotification from '../Alerts/BriefNotification';

import { FORMULA_TITLE_MAX_CHAR } from '../../../utils/constants';
import LatexMirror from '../Render/LatexMirror';
import LatexProvider from '../../Contexts/Latex';
import { TagsMenu } from './Tags';
import CategoriesMenu from './CategoriesMenu';

const useStyles = makeStyles((theme: Theme) => ({
    latexContainer: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    mirror: {
        display: 'grid !important',
        alignContent: 'center',
        maxWidth: '280px',
        width: '90vw',
        overflowY: 'scroll',
        height: '200px',
        backgroundColor: 'white',
        '@media (min-width: 900px)': {
            maxWidth: '400px',
            height: '350px'
        }
    }
}));

export const EditMenu: React.FC<{ context: IformulaContext }> = ({ context }) => {
    const { formula } = context as IfullFormulaContext;

    const [open, setOpen] = useState(true);
    const [title, setTitle] = useState(formula.title);
    const [latex, setLatex] = useState(formula.latexCode);
    const [tags, setTags] = useState(formula.tags)
    const [category, setCategory] = useState(formula.category)
    const [saveLoading, setSaveLoading] = useState(false);

    const classes = useStyles();

    console.log({ formula })

    const handleTitleChange = (e: React.FormEvent) => {
        const element = e.currentTarget as HTMLElement;
        console.log(element.innerText);
        if (element.innerText === "") {
            renderAt(<Alert type="warning" text="Title can not be empty" />, "_overlay");
            return;
        } else if (element.innerText === title) {
            console.log("title did not change.")
            return;
        }
        setTitle(title);
    }

    const handleTagDelete = (targetTag: string) => {
        setTags(tags.filter(tag => tag !== targetTag))
    }

    const saveChanges = useCallback(async () => {
        setSaveLoading(true)
        await axios.post("/api/formulas/edit", {
            ...formula, title, latex, tags
        })
            .then(res => {
                console.log("/api/formulas/edit", { res })
                if ("error" in res) {
                    renderAt(<BriefNotification type='main' severity='error' text="Formula could not be saved, internal error" />, "_overlay")
                }
            })
            .catch(err => {
                console.error(err);
                renderAt(<BriefNotification type='main' severity='error' text={String(err)} />, "_overlay")
            })

        setSaveLoading(false)
        setTimeout(() => setOpen(false), 500)

    }, [formula, title, latex, tags, setSaveLoading])

    return (
        <Dialog
            fullScreen
            open={open}
            onClose={() => setOpen(false)}
            TransitionComponent={Transition}
        >
            <AppBar sx={{ position: 'relative' }}>
                <Toolbar>
                    <IconButton
                        edge="start"
                        color="inherit"
                        onClick={() => setOpen(false)}
                        aria-label="close"
                    >
                        <CloseIcon />
                    </IconButton>
                    <Typography
                        sx={{ ml: 2, flex: 1 }}
                        variant="h6"
                        component="div"
                        contentEditable={true}
                        onKeyUp={checkCharCount}
                        onKeyDown={checkCharCount}
                        onBlur={handleTitleChange}
                    >
                        {title}
                    </Typography>
                    <LoadingButton
                        loading={saveLoading}
                        autoFocus
                        color="inherit"
                        onClick={saveChanges}>
                        save
                    </LoadingButton>
                </Toolbar>
            </AppBar>
            <List>
                {/* latex */}
                <ListItem
                    component={Box}
                    className={classes.latexContainer}
                >
                    <LatexProvider>
                        <TextField
                            id="latexInput"
                            label="LaTeX code"
                            multiline
                            rows={5}
                            defaultValue={latex}
                            onChange={(e: React.FormEvent<HTMLTextAreaElement | HTMLInputElement>) => setLatex(e.currentTarget.value)}
                        />
                        <LatexMirror rawLatex={latex} className={classes.mirror} />
                    </LatexProvider>
                </ListItem>
                <Divider />
                {/* tags */}
                <TagsMenu handleTagDelete={handleTagDelete} tags={tags} updateTags={setTags} />
                <Divider /> 
                {/* categories */}
                <CategoriesMenu category={category} updateCategory={setCategory} />
            </List>
        </Dialog>
    );
}

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const checkCharCount = (e: React.FormEvent) => {
    const text = (e.currentTarget as HTMLElement).innerText;
    if (text.length > FORMULA_TITLE_MAX_CHAR) {
        console.log("text exceddeed max chars")
        renderAt(<Alert type="warning" text="Title has exceeded max number of characters" />, "_overlay")
        e.preventDefault();
    }
}

export default EditMenu;
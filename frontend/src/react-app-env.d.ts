/// <reference types="react-scripts" />

// components
interface IntrinsicProps {
    id?: string;
    className?: string;
    ref?: React.Ref;
    // [key: string]: string;
}

type PageProps = IntrinsicProps & {
    withNav?: boolean
}

type AlertProps = IntrinsicProps & {
    type: "error" | "info" | "warning" | "success";
    title?: string;
    text: string;
    caption?: string;
}

interface SidePanelHeaderProps {
    panelIsOpen?: boolean;
    toggleCallback: () => void;
}

type FormulaProps = Iformula;

interface FormulaMenuProps {
    // formula: IformulaPartial;
    anchorEl: null | HTMLElement;
    open: boolean;
    handleClose: () => void;
}

type TagProps = IntrinsicProps & {
    name: string;

}

type BriefNotificationProps = IntrinsicProps & {
    type: "main" | "secondary";
    severity: "success" | "error" | "info" | "warning";
    text: string;
}

type DeleteDialogProps = IntrinsicProps & {
    formulaId: string;
}

interface FormulaProviderProps {
    formula: Iformula;
}

type LatexMirrorProps = IntrinsicProps & {
    rawLatex: string;
}

type TagsMenuProps = IntrinsicProps & {
    tags: string[];
    handleTagDelete: (tag: string) => void;
}

// interfaces
interface Iobject {
    [key: string]: string;
}
interface Iuser {
    id: number;
    username: string;
    name: string;
    email: string;
    avatarUrl: string;
    registeredAt: string;
}

interface Iauth {
    username: string;
    avatarUrl: string;
    email: string;
}

interface Iformula {
    id: number;
    addedAt: string;
    tags: string[];
    title: string;
    latexCode: string;
    images: Iimage[];
    isDeleted: boolean;
}

interface Iimage {
    id: number;
    date: string;
    url: string;
    title: string;
}

interface IformulaResponse {
    data?: {
        formulas: Iformula[]
    };
    error?: string;
}

interface IformulaPartial {
    id: string;
    title: string;
    latexCode: string;
    tags: string[];
}

interface IformulaContext {
    formula: Iformula | {};
    setFormula: (formula: Iformula | {}) => void;
}

interface IfullFormulaContext {
    formula: Iformula;
    setFormula: (formula: Iformula | {}) => void;
}

// types
type InputState = "initial" | boolean;

// storage
interface IcookiesStorage {
    getItem: (item: string) => string | undefined;
    setItem: (item: string, value: string, days?: number | undefined) => void;
    deleteItem: (item: string) => void;
}
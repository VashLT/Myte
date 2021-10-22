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
    updateTags: (tags: string[]) => void;
}

type CategoriesMenuProps = IntrinsicProps & {
    category: string;
    updateCategory: (category: string) => void;

}

interface EditLatexProps extends IntrinsicProps {
    latex: string;
    updateLatex: (latex: string) => void;
}

// interfaces
interface Iobject {
    [key: string]: string;
}
interface Iuser {
    idUser: number;
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
    idFormula: number;
    addedAt: string;
    tags: string[];
    category: string;
    title: string;
    latexCode: string;
    images: Iimage[];
    isDeleted: boolean;
}

interface Iimage {
    idImage: number;
    date: string;
    url: string;
    title: string;
}

interface IaddFormula {
    title: string;
    latexCode: string;
    category: string;
    images: Iimage[];
}

// types
type InputState = "initial" | boolean;

type MInputEvent = React.FormEvent<HTMLInputElement | HTMLTextAreaElement>;

// responses

interface IresponseFormulas extends Iresponse {
    data: {
        formulas: Iformula[];
        error: string;
    };
}

interface Iresponse {
    data: {
        [key: string]: string;
    },
    status: number;
    [key: string]: string;
}

interface IresponseAuth {
    data: {
        data: Iauth;
    }
}

interface IresponseLogin extends Iresponse {
    data: {
        info: string;
        user: Iauth;
        success: string;
        failure: string;
    }
}

interface IresponseLoginFail {
    failure: string;
}

interface IresponseTags extends Iresponse {
    data: {
        tags?: string[];
        error?: string;
    }
}

interface IresponseCategories extends Iresponse {
    data: {
        categories?: string[];
        error?: string;
    }
}

interface IresponseState extends Iresponse {
    data: {
        error?: string;
        success?: string;
    }
}

interface IformulaContext {
    formula: Iformula | {};
    setFormula: (formula: Iformula | {}) => void;
}

interface IfullFormulaContext {
    formula: Iformula;
    setFormula: (formula: Iformula | {}) => void;
}

// storage
interface IcookiesStorage {
    getItem: (item: string) => string | undefined;
    setItem: (item: string, value: string, days?: number | undefined) => void;
    deleteItem: (item: string) => void;
}


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
    anchorEl: null | HTMLElement;
    open: boolean;
    handleClose: () => void;
}

// interfaces
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

// types
type InputState = "initial" | boolean;

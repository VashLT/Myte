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


// interfaces
interface Iauth {
    username: string;
    avatarUrl: string;
    email: string;
}

// types
type InputState = "initial" | boolean;

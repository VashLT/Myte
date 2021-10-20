import React from 'react';
import { MathJax } from 'better-react-mathjax';

export const LatexRender: React.FC = ({ children, ...props }) => {
    console.log(children)
    return (
        <MathJax {...props}>
            {`${children}`}
        </MathJax>
    );
}

export default LatexRender;
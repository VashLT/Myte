import React from 'react';
import { MathJax, MathJaxProps } from 'better-react-mathjax';

export const LatexRender: React.FC<MathJaxProps & IntrinsicProps> = ({ children, ...props }) => {
    // gather allows making newlines with '\\'
    return (
        <MathJax {...props} className="latex__render">
            {`$$\\begin{gather}${children}\\end{gather}$$`}
        </MathJax>
    );
}

export default LatexRender;
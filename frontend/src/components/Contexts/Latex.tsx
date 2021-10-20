import React from 'react';
import { MathJaxContext } from 'better-react-mathjax';

import { MATHJAX_CONFIG } from '../../utils/constants';

export const LatexProvider: React.FC = ({ children }) => {
    return (
        <MathJaxContext version={3} config={MATHJAX_CONFIG}>
            {children}
        </MathJaxContext>
    )
}

export default LatexProvider;
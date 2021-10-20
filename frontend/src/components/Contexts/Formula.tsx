import React, { useState } from 'react';

export const FormulaContext = React.createContext({
    formula: {} as Iformula | {},
    setFormula: (formula: Iformula | {}) => { }
});

export const FormulaProvider: React.FC<FormulaProviderProps> = ({ formula, children }) => {
    const [currentFormula, setFormula] = useState<Iformula | {}>(formula);
    console.log("FormulaProvider", { formula, currentFormula });

    return (
        <FormulaContext.Provider value={{ formula: currentFormula, setFormula }}>
            {children}
        </FormulaContext.Provider>
    )
}

export default FormulaContext;
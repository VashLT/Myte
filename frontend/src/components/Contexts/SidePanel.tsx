import React, { useState } from "react";

export const PANEL_MAX_WIDTH = 240; // pixels
export const PANEL_MIN_WIDTH = 80; // pixels

export const SidePanelContext = React.createContext({
    panelWidth: PANEL_MAX_WIDTH,
    setPanelWidth: (width: number) => { },
    showPanel: false,
    setShowPanel: (show: boolean) => { }
});

export const SidePanelProvider: React.FC = ({ children }) => {
    const [panelWidth, setPanelWidth] = useState<number>(PANEL_MAX_WIDTH);
    const [showPanel, setShowPanel] = useState<boolean>(false);

    return (
        <SidePanelContext.Provider value={{ panelWidth, setPanelWidth, showPanel, setShowPanel }}>
            {children}
        </SidePanelContext.Provider>
    )
}

export default SidePanelContext;
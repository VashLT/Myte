import React, { useState } from "react";
import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";

export const ThemeContext = React.createContext({
    isDark: true,
    setIsDark: (isDark: boolean) => { }
})

const MyteThemeProvider: React.FC = ({ children }) => {
    // TODO: retrieve theme from localstorage
    const [isDark, setIsDark] = useState(false);

    const theme = createTheme({
        palette: { mode: isDark ? "dark" : "light" }
    })

    console.log("Rendering: ", { isDark })

    return (
        <ThemeContext.Provider value={{ isDark, setIsDark }}>
            <ThemeProvider theme={theme}>
                {children}
            </ThemeProvider>
        </ThemeContext.Provider>
    )
}

export default MyteThemeProvider
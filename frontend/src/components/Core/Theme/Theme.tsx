import React, { useMemo, useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { red, blue, indigo } from '@mui/material/colors';


export const ThemeContext = React.createContext({
    isDark: true,
    setIsDark: (isDark: boolean) => { }
})

const MyteThemeProvider: React.FC = ({ children }) => {
    // TODO: retrieve theme from localstorage
    const [isDark, setIsDark] = useState(false);

    const theme = useMemo(() => {
        return createTheme({
            palette: {
                mode: isDark ? "dark" : "light",
                primary: {
                    main: indigo[500]
                }
            }

        })
    }, [isDark])

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
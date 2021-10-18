import React, { useContext } from 'react';

import IconButton from '@mui/material/IconButton';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import { useTheme } from '@mui/material';
import { ThemeContext } from './Theme';

export const Toggle: React.FC = () => {
    const theme = useTheme();
    const { isDark, setIsDark } = useContext(ThemeContext);

    const toggleTheme = () => {
        setIsDark(isDark === true ? false : true)
    }

    console.log(theme.palette.mode)
    return (
        <IconButton onClick={toggleTheme}>
            {
                theme.palette.mode === "light" ? <Brightness7Icon />
                    : <Brightness4Icon />

            }
        </IconButton>
    );
}

export default Toggle;
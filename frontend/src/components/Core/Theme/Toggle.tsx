import React, { useContext } from 'react';

import IconButton from '@mui/material/IconButton';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import { useTheme } from '@mui/material';
import { ThemeContext } from './Theme';
import { storeTheme } from '../../../utils/storage';

export const Toggle: React.FC<IntrinsicProps> = ({className}) => {
    const theme = useTheme();
    const { isDark, setIsDark } = useContext(ThemeContext);

    const toggleTheme = () => {
        setIsDark(!isDark);
        storeTheme(isDark ? "light" : "dark");
    }

    return (
        <IconButton onClick={toggleTheme} className={className || ""}>
            {
                theme.palette.mode === "light" ? <Brightness7Icon style={{ color: 'white' }} />
                    : <Brightness4Icon />

            }
        </IconButton>
    );
}

export default Toggle;
import { Button } from '@mui/material';
import { ThemeContext } from '../Core/Theme/Theme';
import React, { useContext } from 'react';

export const Home: React.FC = () => {
    const { isDark, setIsDark } = useContext(ThemeContext)

    const toggleTheme = () => {
        if (isDark) {
            setIsDark(false)
        } else {
            setIsDark(true)
        }
    }

    return (
        <div>
            <Button onClick={toggleTheme}>This is a button</Button>
        </div>
    );
}

export default Home;
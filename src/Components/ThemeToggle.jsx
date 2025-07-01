import React, { useContext } from 'react';
import { FaSun, FaMoon } from 'react-icons/fa';
import { ThemeContext } from '../Context/ThemeProvider';

const ThemeToggle = () => {
    const { theme, toggleTheme } = useContext(ThemeContext);

    return (
        <button
            onClick={toggleTheme}
            className="btn btn-ghost btn-circle"
            style={{ color: 'var(--text-primary)' }}
            title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        >
            {theme === 'light' ? (
                <FaMoon className="h-5 w-5" />
            ) : (
                <FaSun className="h-5 w-5" />
            )}
        </button>
    );
};

export default ThemeToggle;
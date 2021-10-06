import React, { useState, createContext } from "react";

export const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
    const [mode, setTheme] = useState("dark");
    return (
        <ThemeContext.Provider
            value={{
                mode,
                setTheme: () => setTheme(mode === "dark" ? "light" : "dark"),
            }}
        >
            {children}
        </ThemeContext.Provider>
    );
};

export default ThemeProvider;

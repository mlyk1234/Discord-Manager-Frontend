import { useState, useEffect } from "react";
  
export function useDarkSide() {
    const [theme, setTheme] = useState<string>('dark');
    const colorTheme = theme === "dark" ? "light" : "dark";
    const defaultState = localStorage.getItem('theme');

    useEffect(() => {
        const root = window.document.documentElement;
        root.classList.remove(colorTheme);
        root.classList.add(theme);
        console.log(defaultState)
        if(defaultState === null) {
            localStorage.setItem('theme', 'green');
        } else {
            localStorage.setItem('theme', theme);
        }
    }, [theme, colorTheme, defaultState]);
  
    return { colorTheme, setTheme };
}

export function useTheme() {

}
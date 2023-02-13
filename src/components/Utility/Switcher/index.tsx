
import { useState } from "react";
import { useDispatch } from "react-redux";
import { DarkModeSwitch } from "react-toggle-dark-mode";
import { useDarkSide } from "../../../shared/hooks/global/useDarkSide";
  
export default function Switcher() {
    const { colorTheme, setTheme } = useDarkSide();
    const [darkSide, setDarkSide] = useState(
        colorTheme === "light" ? true : false
    );
  
    const toggleDarkMode = (checked: boolean) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        setTheme(colorTheme);
        setDarkSide(checked);
    };

    return (
        <>
            <DarkModeSwitch
                style={{ marginBottom: "2rem" }}
                checked={darkSide}
                onChange={toggleDarkMode}
                size={30}
            />
        </>
    );
}
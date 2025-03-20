import { useState, useEffect } from "react";
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";

const ThemeToggleButton = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setIsDarkMode(savedTheme === "dark");
    } else {
      setIsDarkMode(false);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDarkMode ? "dark" : "light";
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark", !isDarkMode);
    localStorage.setItem("theme", newTheme);
  };

  return (
    <button onClick={toggleTheme} className="!p-2 cursor-pointer">
      {isDarkMode ? (
        <MdOutlineLightMode size={20} />
      ) : (
        <MdOutlineDarkMode size={20} />
      )}
    </button>
  );
};

export default ThemeToggleButton;

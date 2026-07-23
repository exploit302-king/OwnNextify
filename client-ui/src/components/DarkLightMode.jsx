import React, { useState, useEffect } from 'react';
import { HiLightBulb, HiOutlineLightBulb  } from "react-icons/hi2";

const DarkLightModeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <button
      onClick={toggleDarkMode}
      className="flex items-center p-1  rounded-full transition duration-300"
    >
      {isDarkMode ? (
        <HiOutlineLightBulb className="h-7 w-7 text-gray-500 " />
      ) : (
        <HiLightBulb className="h-7 w-7 text-[yellow] dark:text-[yellow]" />
      )}
    </button>
  );
};

export default DarkLightModeToggle;

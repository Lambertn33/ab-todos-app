import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
    document.documentElement.classList.toggle("dark", !isDarkMode);
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <Navbar toggleTheme={toggleTheme} isDarkMode={isDarkMode} />
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
};

export default Layout;

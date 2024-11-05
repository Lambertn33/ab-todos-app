import React from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { useTheme } from "@/context/ThemeContext";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isDarkMode, toggleTheme } = useTheme();
  return (
    <div
      className={`flex ${
        isDarkMode ? "bg-secondaryDark text-white" : "bg-white"
      }`}
    >
      <Sidebar isDarkMode={isDarkMode} />
      <div className="flex-1">
        <Navbar isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
};

export default Layout;

import React from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { useTheme } from "@/context/ThemeContext";
import { useSearch } from "@/context/SearchContext";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isDarkMode, toggleTheme } = useTheme();
  const { setSearchTerm } = useSearch();

  const handleSearchTerm = (value: string) => {
    setSearchTerm(value);
  };

  return (
    <div
      className={`flex ${
        isDarkMode ? "bg-secondaryDark text-white" : "bg-white"
      }`}
    >
      <Sidebar isDarkMode={isDarkMode} />
      <div className="flex-1">
        <Navbar
          isDarkMode={isDarkMode}
          toggleTheme={toggleTheme}
          onSearch={handleSearchTerm}
        />
        {/* .. 88px is the height of the Navbar.. */}
        <div
          className={`p-8 h-[calc(100vh-88px)] overflow-auto ${
            isDarkMode ? "bg-secondaryDark text-white" : "bg-gray-100"
          }`}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;

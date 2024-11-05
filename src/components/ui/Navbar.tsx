import React, { useState } from "react";
import {
  MoonIcon,
  SunIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";

const Navbar: React.FC<{ toggleTheme: () => void; isDarkMode: boolean }> = ({
  toggleTheme,
  isDarkMode,
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="flex items-center justify-between px-8 py-4 bg-white shadow-sm dark:bg-gray-800">
      {/* Search Bar */}
      <div className="relative flex-grow max-w-[50%] md:max-w-[33%]">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="w-full border rounded-lg bg-gray-100 p-2 pl-4 pr-4 focus:outline-none focus:ring focus:ring-blue-300"
        />
        <MagnifyingGlassIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
      </div>

      {/* Theme Toggle Icon */}
      <button
        onClick={toggleTheme}
        className="ml-4 p-2 rounded-full focus:outline-none"
      >
        <div className="bg-gray-200 p-2 rounded-md">
          {isDarkMode ? (
            <SunIcon className="h-6 w-6 text-yellow-500" />
          ) : (
            <MoonIcon className="h-6 w-6 text-gray-600" />
          )}
        </div>
      </button>
    </div>
  );
};

export default Navbar;

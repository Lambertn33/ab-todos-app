import React, { useState } from "react";
import {
  MoonIcon,
  SunIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { useTranslation } from "react-i18next";
import { useLanguage } from "@/context/LanguageContext";

interface NavbarProps {
  isDarkMode: boolean;
  toggleTheme: () => void;
  onSearch: (term: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({
  isDarkMode,
  toggleTheme,
  onSearch,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const { language, setLanguage } = useLanguage();
  const { t } = useTranslation();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <nav
      className={`flex items-center justify-between px-8 py-4 ${
        isDarkMode ? "bg-primaryDark" : "bg-white"
      } shadow-sm`}
    >
      <div className="relative flex-grow max-w-[50%] md:max-w-[33%]">
        <input
          type="text"
          placeholder={t("navbar.searchPlaceholder")}
          value={searchTerm}
          onChange={handleSearchChange}
          className={`w-full border rounded-lg ${
            isDarkMode ? "bg-gray-600" : "bg-gray-100"
          } p-2 pl-4 pr-4 focus:outline-none focus:ring focus:ring-blue-300`}
        />
        <MagnifyingGlassIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
      </div>

      <div className="flex gap-2 items-center">
        <button
          onClick={toggleTheme}
          className="ml-4 p-2 rounded-full focus:outline-none"
        >
          <div
            className={`${
              isDarkMode ? "bg-gray-600" : "bg-gray-200"
            } p-2 rounded-md`}
          >
            {isDarkMode ? (
              <SunIcon className="h-6 w-6 text-yellow-500" />
            ) : (
              <MoonIcon className="h-6 w-6 text-gray-600" />
            )}
          </div>
        </button>

        {/* Language Toggle */}
        <select
          className="w-full border border-gray-300 p-2 rounded-lg text-primaryDark"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        >
          <option value="en">English</option>
          <option value="fr">Francais</option>
        </select>
      </div>
    </nav>
  );
};

export default Navbar;

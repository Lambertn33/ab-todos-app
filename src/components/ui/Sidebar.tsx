import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  HomeIcon,
  ClipboardIcon,
  XMarkIcon,
  Bars3Icon,
} from "@heroicons/react/24/outline";
import { useTranslation } from "react-i18next";

const Sidebar: React.FC<{ isDarkMode: boolean }> = ({ isDarkMode }) => {
  const { t } = useTranslation();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activePath, setActivePath] = useState<string>(useLocation().pathname);

  const links = [
    { name: t("sidebar.home"), icon: HomeIcon, path: "/" },
    { name: t("sidebar.todos"), icon: ClipboardIcon, path: "/todos" },
  ];

  const toggleSidebar = () => setIsCollapsed((prev) => !prev);

  const handleLinkClick = (path: string) => setActivePath(path);

  // Handle screen resize
  useEffect(() => {
    const handleResize = () => {
      setIsCollapsed(window.innerWidth < 768);
    };

    handleResize(); // Set initial state based on screen size
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const getNavLinkClasses = (isActive: boolean) => {
    const baseClasses =
      "flex items-center p-3 transition-colors duration-200 overflow-hidden";
    const activeClasses = isActive
      ? "text-primary border-l-4 border-primary bg-blue-200"
      : isDarkMode
      ? "text-gray-300 hover:bg-gray-700"
      : "text-gray-600 hover:bg-gray-100 hover:text-gray-800";

    return `${baseClasses} ${activeClasses}`;
  };

  const getIconClasses = (isActive: boolean) => {
    return isActive
      ? "text-primary"
      : isDarkMode
      ? "text-white"
      : "text-gray-600";
  };

  return (
    <div
      className={`h-screen ${
        isDarkMode ? "bg-primaryDark" : "bg-white"
      } text-gray-800 shadow-lg flex flex-col transition-width duration-300 ${
        isCollapsed ? "w-16" : "w-64"
      }`}
    >
      {/* Toggle Button */}
      <button
        onClick={toggleSidebar}
        className="p-4 flex items-center justify-between text-gray-600 hover:text-gray-800 focus:outline-none"
      >
        {!isCollapsed && (
          <span
            className={`${
              isDarkMode ? "text-white" : "text-primary"
            } font-bold text-xl uppercase`}
          >
            {t("sidebar.title")}
          </span>
        )}
        <span className="ml-auto">
          {isCollapsed ? (
            <Bars3Icon className="h-6 w-6" />
          ) : (
            <XMarkIcon className="h-6 w-6" />
          )}
        </span>
      </button>

      {/* Sidebar Links */}
      <nav className="flex-1 mt-4">
        {links.map((link) => {
          const IconComponent = link.icon;
          const isActive = activePath === link.path;

          return (
            <NavLink
              key={link.name}
              to={link.path}
              onClick={() => handleLinkClick(link.path)}
              className={getNavLinkClasses(isActive)}
            >
              <IconComponent
                className={`h-6 w-6 mr-3 ${getIconClasses(isActive)}`}
              />

              {/* Show label only if sidebar is expanded */}
              {!isCollapsed && (
                <span className="font-semibold">{link.name}</span>
              )}
            </NavLink>
          );
        })}
      </nav>
    </div>
  );
};

export default Sidebar;

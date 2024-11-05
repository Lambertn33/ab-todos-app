import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

import {
  HomeIcon,
  ClipboardIcon,
  XMarkIcon,
  Bars3Icon,
} from "@heroicons/react/24/outline";

const links = [
  { name: "Home", icon: HomeIcon, path: "/" },
  { name: "Tasks", icon: ClipboardIcon, path: "/tasks" },
];

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activePath, setActivePath] = useState<string>(useLocation().pathname);

  const toggleSidebar = () => setIsCollapsed((prev) => !prev);

  const handleLinkClick = (path: string) => setActivePath(path);

  // Effect to handle screen resize
  useEffect(() => {
    const handleResize = () => {
      const isSmallDevices = window.innerWidth < 768;
      setIsCollapsed(isSmallDevices ? true : false);
    };

    // Set initial state based on screen size
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div
      className={`h-screen bg-white text-gray-800 shadow-lg flex flex-col transition-width duration-300 ${
        isCollapsed ? "w-16" : "w-64"
      }`}
    >
      {/* Toggle Button */}
      <button
        onClick={toggleSidebar}
        className="p-4 flex items-center justify-between text-gray-600 hover:text-gray-800 focus:outline-none"
      >
        {!isCollapsed && (
          <span className="text-lg font-semibold text-primary">Tasks App</span>
        )}
        <span className="ml-auto">
          {isCollapsed ? (
            <Bars3Icon className="h-6 w-6 text-primary" />
          ) : (
            <XMarkIcon className="h-6 w-6 text-primary" />
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
              className={`flex items-center p-3 transition-colors duration-200 overflow-hidden ${
                isActive
                  ? "text-primary border-l-4 border-primary bg-blue-100"
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-800"
              }`}
            >
              {/* Icon with conditional color */}
              <IconComponent
                className={`h-6 w-6 mr-3 ${
                  isActive ? "text-primary" : "text-gray-600"
                }`}
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

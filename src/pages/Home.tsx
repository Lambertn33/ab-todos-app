import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import { useTheme } from "@/context/ThemeContext";

const Home = () => {
  const { t } = useTranslation();
  const { isDarkMode } = useTheme();

  return (
    <section
      className={`${
        isDarkMode ? "bg-primaryDark" : "bg-white"
      } dark:bg-gray-900 rounded-lg shadow-md flex justify-center items-center`}
    >
      <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16">
        <h1
          className={`mb-4 text-3xl font-extrabold tracking-tight leading-none ${
            isDarkMode ? "text-white" : "text-gray-900"
          } md:text-5xl lg:text-6xl`}
        >
          {t("home.title")}
        </h1>
        <p className="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 lg:px-48 dark:text-gray-400">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque
          labore, illum non quaerat nostrum vitae. Nulla modi voluptatum
          quisquam dicta perferendis provident placeat corrupti! Dolores quod
          atque hic dolorum omnis.
        </p>
        <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0">
          <Link
            to="/todos"
            className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900"
          >
            {t("home.buttonLink")}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Home;

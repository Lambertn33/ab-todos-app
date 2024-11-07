import { ChevronRight } from "lucide-react";
import { useTranslation } from "react-i18next";

const TodosHeader = () => {
  const { t } = useTranslation();
  const today = new Date().toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
  });

  return (
    <div className="flex flex-col gap-y-4">
      <div className="hidden lg:flex justify-between">
        <div className="flex gap-x-1 items-center">
          <span className="text-sm text-gray-400">
            {t("todos.header.workspace")}
          </span>
          <ChevronRight className="h-6 w-4 text-gray-400" />
          <span className="text-sm text-gray-400">
            {t("todos.header.creative")}
          </span>
          <ChevronRight className="h-6 w-4 text-gray-400" />
          <span className="text-sm text-gray-900 font-semibold">
            {t("todos.header.creativeWebsite")}
          </span>
        </div>
        <span className="text-sm text-gray-900 font-semibold">
          {t("todos.header.from")} {today}
        </span>
      </div>
      <div className="flex justify-between items-center">
        <h2 className="text-2xl lg:text-3xl font-bold">
          {t("todos.header.websiteDesign")}
        </h2>
        <div className="flex items-center justify-between gap-x-1">
          <span className="w-2 h-2 bg-green-600 rounded-full block"></span>
          <span className="text-sm text-gray-400">
            {t("todos.header.updated")}
          </span>
        </div>
      </div>
    </div>
  );
};

export default TodosHeader;

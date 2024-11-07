import React from "react";
import { useTheme } from "@/context/ThemeContext";
import { TodoType } from "@/interfaces/Todo";
import { PlusIcon } from "@heroicons/react/24/outline";
import { useTranslation } from "react-i18next";

const TodosFilter: React.FC<{
  filterType: string;
  allTodosCount: number | undefined;
  completedTodosCount: number | undefined;
  pendingTodosCount: number | undefined;
  onFilterChange: (type: string) => void;
  onOpenModal: () => void;
}> = ({
  allTodosCount,
  completedTodosCount,
  pendingTodosCount,
  filterType,
  onFilterChange,
  onOpenModal,
}) => {
  const { isDarkMode } = useTheme();
  const { t } = useTranslation();

  const filterOptions = [
    { label: t("todos.filters.all"), value: allTodosCount, type: TodoType.ALL },
    {
      label: t("todos.filters.pending"),
      value: pendingTodosCount,
      type: TodoType.PENDING,
    },
    {
      label: t("todos.filters.completed"),
      value: completedTodosCount,
      type: TodoType.COMPLETED,
    },
  ];

  const handleSetFilterType = (type: string) => onFilterChange(type);

  return (
    <div
      className={`flex flex-col lg:flex-row gap-4 justify-between p-4 mt-4 overflow-hidden rounded-lg relative ${
        !isDarkMode ? "bg-white" : "bg-primaryDark"
      }`}
    >
      <div className="flex items-center gap-x-8">
        {filterOptions.map((option) => (
          <button
            key={option.type}
            onClick={() => handleSetFilterType(option.type)}
            className={`${
              filterType === option.type
                ? isDarkMode
                  ? "text-blue-400"
                  : "text-blue-700"
                : isDarkMode
                ? "text-gray-200"
                : "text-gray-700"
            } font-semibold relative text-xs flex items-center gap-x-1 z-50`}
          >
            {option.label}
            <span
              className={`${
                isDarkMode ? "bg-gray-700" : "bg-blue-200"
              } py-0.5 px-1 text-xs rounded-md`}
            >
              {option.value}
            </span>
            {filterType === option.type && (
              <div className="h-full w-full hidden lg:block bg-primary absolute top-9 rounded-t-lg"></div>
            )}
          </button>
        ))}
      </div>

      <div className="flex justify-between items-center">
        <button
          className="flex items-center gap-x-3 border-2 rounded-lg px-4 py-1"
          onClick={onOpenModal}
        >
          <PlusIcon className="w-4 h-4" />
          <span
            className={`${
              isDarkMode ? "text-gray-200" : "text-gray-700"
            } text-sm `}
          >
            {" "}
            {t("todos.filters.new")}
          </span>
        </button>
      </div>
    </div>
  );
};

export default TodosFilter;

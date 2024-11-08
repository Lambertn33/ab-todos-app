import React, { useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useTheme } from "@/context/ThemeContext";
import { useTranslation } from "react-i18next";

interface TodoFormProps {
  isOpen: boolean;
  isAddTodoPending: boolean;
  onClose: () => void;
  onCreateTodo: (newTodo: {
    completed: boolean;
    todo: string;
    userId: string;
  }) => void;
}

const TodoForm: React.FC<TodoFormProps> = ({
  isOpen,
  isAddTodoPending,
  onClose,
  onCreateTodo,
}) => {
  const [todo, setTodo] = useState({
    completed: false,
    todo: "",
    userId: "",
  });

  const handleChange = (input: string, value: string | boolean) => {
    setTodo((prevTodo) => ({
      ...prevTodo,
      [input]: value,
    }));
  };

  const handleSubmit = () => {
    onCreateTodo(todo);
  };

  const { isDarkMode } = useTheme();
  const { t } = useTranslation();

  const isFormValid =
    todo.todo !== "" && todo.userId !== "" && todo.completed !== null;

  return (
    <div
      className={`fixed z-50 top-0 right-0 h-full w-full md:w-1/2 lg:w-1/3 ${
        isDarkMode ? "bg-secondaryDark" : "bg-white"
      } shadow-lg transform transition-transform p-8 ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="flex items-center justify-between">
        <h2 className="text-xl">{t("todos.form.title")}</h2>
        <XMarkIcon className="w-6 h-6 cursor-pointer" onClick={onClose} />
      </div>
      <div className="mt-8">
        <div className="flex flex-col gap-2">
          <label htmlFor="todo" className="text-sm font-semibold">
            {t("todos.form.todo")} *
          </label>
          <input
            id="todo"
            type="text"
            value={todo.todo}
            onChange={(e) => handleChange("todo", e.target.value)}
            placeholder={t("todos.form.todo")}
            className="w-full border border-gray-300 p-2 rounded-lg mb-4 text-primaryDark"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="todo" className="text-sm font-semibold">
            {t("todos.form.owner")} *
          </label>
          <select
            id="todo"
            value={todo.userId}
            onChange={(e) => handleChange("userId", e.target.value)}
            className="w-full border border-gray-300 p-2 rounded-lg mb-4 text-primaryDark"
          >
            <option value="" disabled>
              {t("todos.form.selectLabel")}
            </option>
            {Array.from({ length: 5 }, (_, i) => (
              <option key={i + 1} value={i + 1}>
                User with ID #{i + 1}
              </option>
            ))}
          </select>
        </div>
        <label className="block mb-4">
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={(e) => handleChange("completed", e.target.checked)}
            className="mr-2 p-2"
          />
          <span className="font-semibold text-sm">
            {t("todos.form.checkBoxLabel")} *
          </span>
        </label>
        <button
          disabled={isAddTodoPending || !isFormValid}
          onClick={handleSubmit}
          className={`${
            isAddTodoPending || !isFormValid ? "bg-blue-400" : "bg-primary"
          } text-white px-4 py-2 w-full rounded-lg`}
        >
          {isAddTodoPending
            ? t("todos.form.creating")
            : t("todos.form.buttonLabel")}
        </button>
      </div>
    </div>
  );
};

export default TodoForm;

import React, { useEffect, useRef, useState } from "react";
import { ITodo } from "@/interfaces/Todo";
import {
  EllipsisVerticalIcon,
  UserCircleIcon,
  ChatBubbleOvalLeftEllipsisIcon,
} from "@heroicons/react/24/outline";
import { useTheme } from "@/context/ThemeContext";
import { useDeleteTodo, useUpdateTodo } from "@/hooks/useTodos";
import { useTranslation } from "react-i18next";

const TodoItem: React.FC<{ todo: ITodo }> = ({ todo }) => {
  const { isDarkMode } = useTheme();
  const { t } = useTranslation();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const displayText =
    todo.todo.length > 35 ? `${todo.todo.slice(0, 35)}...` : todo.todo;

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  const handleOutsideClick = (e: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
      setIsMenuOpen(false); // Close the menu if clicked outside
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  // update Todo
  const { mutate: updateTodo, isSuccess: isUpdatingSuccess } = useUpdateTodo();

  const handleUpdateTodo = (todoId: number, completed: boolean) => {
    updateTodo({
      todoId,
      completed,
    });
  };

  useEffect(() => {
    if (isUpdatingSuccess) {
      setIsMenuOpen(false);
    }
  }, [isUpdatingSuccess]);

  // delete Todo
  const { mutate: deleteTodo } = useDeleteTodo();

  const handleDeleteTodo = (todoId: number) => deleteTodo(todoId);

  return (
    <div
      className={`relative ${
        isDarkMode ? "bg-primaryDark" : "bg-white"
      } rounded-lg w-full p-4`}
    >
      <div className="flex justify-between">
        <span
          className={`text-xs font-semibold rounded-md px-2 flex items-center
            ${
              todo.completed
                ? "bg-green-200 text-green-800"
                : "bg-yellow-200 text-yellow-800"
            } 
        `}
        >
          {todo.completed
            ? t("todos.filters.completed")
            : t("todos.filters.pending")}
        </span>

        <div className="relative">
          <EllipsisVerticalIcon
            className="h-6 w-6 cursor-pointer"
            onClick={toggleMenu}
          />

          {isMenuOpen && (
            <div
              ref={menuRef}
              className={`absolute right-0 mt-2 w-40 overflow-hidden ${
                isDarkMode ? "bg-primaryDark" : "bg-white"
              } border rounded-lg shadow-lg ${
                isDarkMode ? "bg-primaryDark text-gray-100" : "text-gray-700"
              }`}
            >
              <button
                className={`block px-4 py-2 text-sm ${
                  isDarkMode ? "hover:bg-gray-500" : "hover:bg-gray-100"
                } w-full text-left`}
                onClick={() => handleUpdateTodo(todo.id!, !todo.completed)}
              >
                {t("todos.item.markAs")}{" "}
                {todo.completed
                  ? t("todos.filters.pending")
                  : t("todos.filters.completed")}
              </button>
              <hr />
              <button
                className={`block px-4 py-2 text-sm ${
                  isDarkMode ? "hover:bg-gray-500" : "hover:bg-gray-100"
                } w-full text-left`}
                onClick={() => handleDeleteTodo(todo.id!)}
              >
                {t("todos.item.delete")}
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="mt-2 flex flex-col gap-1">
        <span className="text-xl font-semibold">{displayText}</span>
        <span className="text-sm my-1 font-light">Landing Page UI</span>
      </div>

      <hr className="my-4 border-gray-200" />

      <div className="mt-8">
        <div className="mt-4 absolute bottom-2 left-4 right-4 flex justify-between items-center">
          <UserCircleIcon className="h-6 w-6" />
          <div className="flex gap-2 items-center">
            <ChatBubbleOvalLeftEllipsisIcon className="h-4 w-4" />
            <span className="text-sm">{todo.id}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoItem;

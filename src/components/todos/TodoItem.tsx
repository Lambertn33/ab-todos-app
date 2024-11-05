import React from "react";
import { ITodo } from "@/interfaces/Todo";
import {
  EllipsisVerticalIcon,
  UserCircleIcon,
  ChatBubbleOvalLeftEllipsisIcon,
} from "@heroicons/react/24/outline";
import { useTheme } from "@/context/ThemeContext";

const TodoItem: React.FC<{ todo: ITodo }> = ({ todo }) => {
  const { isDarkMode } = useTheme();
  const displayText =
    todo.todo.length > 35 ? `${todo.todo.slice(0, 35)}...` : todo.todo;

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
          {todo.completed ? "Completed" : "In Progress"}
        </span>
        <EllipsisVerticalIcon className="h-6 w-6" />
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

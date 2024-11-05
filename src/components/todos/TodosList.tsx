import { ITodo } from "@/interfaces/Todo";
import React from "react";
import TodoItem from "./TodoItem";

const TodosList: React.FC<{ todos: ITodo[] }> = ({ todos }) => {
  return (
    <div>
      <div></div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {todos?.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </div>
    </div>
  );
};

export default TodosList;

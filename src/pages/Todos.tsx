import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ITodo } from "@/interfaces/Todo";
import { TodosFilter, TodosHeader, TodosList } from "@/components";
import { TodoType } from "@/interfaces/Todo";
import TodosApi from "@/api/todos";

const todosApi = new TodosApi();

const Todos = () => {
  const {
    isLoading,
    error,
    data: todos,
  } = useQuery<ITodo[]>({
    queryKey: ["todos"],
    queryFn: () => todosApi.GET_ALL(),
  });

  const [filterType, setFilterType] = useState("all");

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading tasks</div>;

  const allTodosCount = todos?.length;
  const completedTodosCount = todos?.filter((todo) => todo.completed).length;
  const pendingTodosCount = todos?.filter((todo) => !todo.completed).length;

  const filteredTodos = todos?.filter((todo) => {
    if (filterType === TodoType.COMPLETED) return todo.completed;
    if (filterType === TodoType.PENDING) return !todo.completed;
    return true;
  });

  return (
    <div>
      <div className="mb-4">
        <TodosHeader />
        <TodosFilter
          allTodosCount={allTodosCount}
          completedTodosCount={completedTodosCount}
          pendingTodosCount={pendingTodosCount}
          filterType={filterType}
          onFilterChange={setFilterType}
        />
      </div>
      <TodosList todos={filteredTodos || []} />
    </div>
  );
};

export default Todos;

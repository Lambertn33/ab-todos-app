import { useState, useEffect } from "react";
import { TodoForm, TodosFilter, TodosHeader, TodosList } from "@/components";
import { TodoType } from "@/interfaces/Todo";
import { useAddTodo, useTodos } from "@/hooks/useTodos";
import { Grid } from "react-loader-spinner";
import { useSearch } from "@/context/SearchContext";

const Todos = () => {
  const { searchTerm } = useSearch();

  // Create Todo
  const {
    mutate: addTodo,
    isSuccess: isAddTodoSuccess,
    reset,
    isPending: isAddTodoPending,
  } = useAddTodo();

  const handleCloseModal = () => {
    setIsModalOpen(false);
    reset();
  };

  const handleAddTodo = (newTodo: {
    completed: boolean;
    userId: string;
    todo: string;
  }) => {
    addTodo({
      ...newTodo,
      userId: +newTodo.userId,
    });
  };

  // Close modal on successful todo addition
  useEffect(() => {
    if (isAddTodoSuccess) {
      handleCloseModal();
      reset();
    }
  }, [isAddTodoSuccess]);

  // Query Todos
  const { isLoading, error: todosError, data: todos } = useTodos();

  // Local state
  const [filterType, setFilterType] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // count and display todos based on search input
  const allTodosCount = todos?.filter((todo) =>
    todo.todo.toLowerCase().includes((searchTerm || "").toLowerCase())
  ).length;

  const completedTodosCount = todos
    ?.filter((todo) => todo.completed)
    .filter((todo) =>
      todo.todo.toLowerCase().includes((searchTerm || "").toLowerCase())
    ).length;

  const pendingTodosCount = todos
    ?.filter((todo) => !todo.completed)
    .filter((todo) =>
      todo.todo.toLowerCase().includes((searchTerm || "").toLowerCase())
    ).length;

  const filteredTodos = todos
    ?.filter((todo) => {
      if (filterType === TodoType.COMPLETED) return todo.completed;
      if (filterType === TodoType.PENDING) return !todo.completed;
      return true;
    })
    .filter((todo) =>
      todo.todo.toLowerCase().includes((searchTerm || "").toLowerCase())
    );

  if (isLoading)
    return (
      <div className="flex w-full justify-center items-center h-full">
        <Grid
          visible={true}
          height="80"
          width="80"
          color="#4fa94d"
          ariaLabel="grid-loading"
          radius="12.5"
          wrapperStyle={{}}
          wrapperClass="grid-wrapper"
        />
      </div>
    );
  if (todosError) return <div>Error loading tasks</div>;

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
          onOpenModal={() => setIsModalOpen(true)}
        />
      </div>
      <TodosList todos={filteredTodos || []} />
      {isModalOpen && (
        <TodoForm
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onCreateTodo={handleAddTodo}
          isAddTodoPending={isAddTodoPending}
        />
      )}
    </div>
  );
};

export default Todos;

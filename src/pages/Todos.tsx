import { useState, useEffect } from "react";
import { TodoForm, TodosFilter, TodosHeader, TodosList } from "@/components";
import { TodoType } from "@/interfaces/Todo";
import { useAddTodo, useTodos } from "@/hooks/useTodos";

const Todos = () => {
  // Create Todo
  const {
    mutate: addTodo,
    isSuccess: isAddTodoSuccess,
    reset,
    error: addTodoError,
  } = useAddTodo();
  const handleCloseModal = () => {
    setIsModalOpen(false);
    reset(); // Reset mutation state when closing modal
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

  useEffect(() => {
    if (addTodoError) {
      console.log(addTodoError);
    }
  }, [addTodoError]);

  // Query Todos
  const { isLoading, error: todosError, data: todos } = useTodos();

  // Local state for filter and modal control
  const [filterType, setFilterType] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (isLoading) return <div>Loading...</div>;
  if (todosError) return <div>Error loading tasks</div>;

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
          onOpenModal={() => setIsModalOpen(true)}
        />
      </div>
      <TodosList todos={filteredTodos || []} />
      {isModalOpen && (
        <TodoForm
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onCreateTodo={handleAddTodo}
        />
      )}
    </div>
  );
};

export default Todos;

import { useQuery } from "@tanstack/react-query";
import TodosApi from "@/api/todos";
import { ITodo } from "@/interfaces/Todo";

import { TodosHeader, TodosList } from "@/components";

const todosApi = new TodosApi();

const Tasks = () => {
  const {
    isLoading,
    error,
    data: todos,
  } = useQuery<ITodo[]>({
    queryKey: ["todos"],
    queryFn: () => todosApi.GET_ALL(),
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading tasks</div>;

  return (
    <div>
      <TodosHeader />
      <TodosList todos={todos || []} />
    </div>
  );
};

export default Tasks;

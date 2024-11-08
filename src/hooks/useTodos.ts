import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import TodosApi from "@/api/todos";
import { ITodo } from "@/interfaces/Todo";

const todosApi = new TodosApi();

export const useTodos = () => {
  return useQuery<ITodo[]>({
    queryKey: ["todos"],
    queryFn: () => todosApi.GET_ALL(),
  });
};

export const useAddTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newTodo: ITodo) => todosApi.POST(newTodo),
    onSuccess: (newTodo) => {
      queryClient.setQueryData<ITodo[]>(["todos"], (oldTodos) => {
        return oldTodos ? [...oldTodos, newTodo] : [newTodo];
      });
    },
  });
};

export const useUpdateTodo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (todo: { todoId: number; completed: boolean }) =>
      todosApi.PUT(todo),
    onSuccess: (updatedTodo) => {
      queryClient.setQueryData<ITodo[]>(["todos"], (oldTodos) => {
        return oldTodos?.map((todo) =>
          todo.id === updatedTodo.id
            ? { ...todo, completed: updatedTodo.completed }
            : todo
        );
      });
    },
  });
};

export const useDeleteTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (todoId: number) => todosApi.DELETE(todoId),
    onSuccess: (deletedTodo) => {
      queryClient.setQueryData<ITodo[]>(["todos"], (oldTodos) => {
        return oldTodos?.filter((todo) => todo.id !== deletedTodo.id);
      });
    },
  });
};

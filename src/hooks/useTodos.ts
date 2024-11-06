import {
  useQuery,
  useMutation,
  useQueryClient,
  UseMutationResult,
} from "@tanstack/react-query";
import TodosApi from "@/api/todos";
import { ITodo } from "@/interfaces/Todo";

const todosApi = new TodosApi();

export const useTodos = () => {
  return useQuery<ITodo[]>({
    queryKey: ["todos"],
    queryFn: () => todosApi.GET_ALL(),
  });
};

export const useAddTodo = (): UseMutationResult<ITodo, Error, ITodo> => {
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

import { ITodo } from "@/interfaces/Todo";
import axios, { AxiosInstance } from "axios";

export default class TodosApi {
  private axiosInstance: AxiosInstance;

  constructor(private baseURL: string = import.meta.env.VITE_API_URL || "") {
    this.axiosInstance = axios.create({
      baseURL: this.baseURL,
    });
  }

  async GET_ALL(): Promise<ITodo[]> {
    const response = await this.axiosInstance.get("/todos");
    return response.data?.todos;
  }

  async POST(body: ITodo): Promise<ITodo> {
    const response = await this.axiosInstance.post("/todos/add", body);
    return response.data;
  }

  async PUT(todo: { todoId: number; completed: boolean }): Promise<ITodo> {
    const response = await this.axiosInstance.put(`/todos/${todo.todoId}`, {
      completed: todo.completed,
    });
    return response.data;
  }

  async DELETE(todoId: number): Promise<ITodo> {
    const response = await this.axiosInstance.delete(`/todos/${todoId}`);
    return response.data;
  }
}

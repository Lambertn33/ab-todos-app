export interface ITodo {
  id: number;
  todo: string;
  completed: Boolean;
  userId: number;
}

export const TodoType = {
  COMPLETED: "completed",
  PENDING: "pending",
  ALL: "all",
};

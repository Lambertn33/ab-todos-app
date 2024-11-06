export interface ITodo {
  id?: number;
  todo: string;
  completed: Boolean;
  userId: number;
  isDeleted?: boolean;
  deletedOn?: string;
}

export const TodoType = {
  COMPLETED: "completed",
  PENDING: "pending",
  ALL: "all",
};

export type Item = {
  id?: number;
  tenantId?: string;
  name: string;
  memo: string | null;
  imageUrl: string | null;
  isCompleted: boolean;
};

export type Todo = Pick<Item, "id" | "name" | "isCompleted">;

export type CreateTodoInput = {
  name: string;
};

export type UpdateTodoInput = Partial<{
  name: string;
  memo: string | null;
  imageUrl: string | null;
  isCompleted: boolean;
}>;

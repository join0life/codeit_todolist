export type Item = {
  id: number;
  tenantId: string;
  name: string;
  memo: string | null;
  imageUrl: string | null;
  isCompleted?: boolean;
};

export type CreateItemDto = {
  name: string;
};

export type UpdateItemDto = {
  name?: string;
  memo?: string | null;
  imageUrl?: string | null;
  isCompleted?: boolean;
};

// export type UpdateTodoPayload = {
//   id: number;
//   name: string;
//   isCompleted: boolean;
//   imageUrl: string | null;
//   memo: string | null;
// };

// export type Todo = Pick<Item, "id" | "name" | "isCompleted">;
// export type CreateTodoInput = { name: string };
// export type UpdateTodoInput = Partial<{
//   name: string;
//   memo: string | null;
//   imageUrl: string | null;
//   isCompleted: boolean;
// }>;
export type ImageData = {
  file: File;
  previewUrl: string;
};

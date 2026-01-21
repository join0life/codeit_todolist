"use server";

import { TENANT_ID } from "@/constants";
import { CreateTodoInput, Item, UpdateTodoInput } from "@/types";
import { revalidatePath } from "next/cache";

export async function createTodo({ name }: CreateTodoInput) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/${TENANT_ID}/items`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        name,
      }),
    },
  );

  if (!res.ok) throw new Error(res.statusText);
  const data = res.json();
  revalidatePath("/");
  return data;
}

export async function updateTodo({
  itemId,
  isCompleted,
}: {
  itemId: number;
  isCompleted: boolean;
}) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/${TENANT_ID}/items/${itemId}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ isCompleted }),
    },
  );

  if (!res.ok) throw new Error(res.statusText);
  const data: UpdateTodoInput = await res.json();
  revalidatePath("/");
  return data;
}



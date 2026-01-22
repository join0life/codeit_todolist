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

/**
 * 이미지 업로드 API
 * @param file
 * @returns data.url
 */
export async function uploadImage(file: File): Promise<string> {
  if (file.size > 5 * 1024 * 1024)
    throw new Error("이미지는 5MB 이하만 업로드 할 수 있습니다.");

  const fileNameWithoutExt = file.name.substring(0, file.name.lastIndexOf("."));
  const hasNonEnglish = /[^a-zA-Z0-9\-_\s]/.test(fileNameWithoutExt);

  if (hasNonEnglish) throw new Error("이미지 파일명은 영어만 가능합니다.");

  const formData = new FormData();
  formData.append("image", file);

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/${TENANT_ID}/images/upload`,
    {
      method: "POST",
      body: formData,
      headers: { Accpept: "application/json" },
    },
  );

  if (!res.ok) throw new Error(res.statusText);
  const data: { url: string } = await res.json();
  return data.url;
}

/**
 * 이미지 url과 함께 할 일 페이지 수정 API
 * @param itemId
 * @param payload
 * @returns data
 */
export async function updateTodoWithImage({
  id: itemId,
  name,
  isCompleted,
  imageUrl,
  memo,
}: Item) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/${TENANT_ID}/items/${itemId}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        name,
        isCompleted,
        imageUrl,
        memo,
      }),
    },
  );

  if (!res.ok) throw new Error(res.statusText);
  const data = await res.json();
  return data;
}

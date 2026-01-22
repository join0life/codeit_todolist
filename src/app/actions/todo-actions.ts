"use server";

import { TENANT_ID } from "@/constants";
import { CreateTodoInput, Item, Todo, UpdateTodoInput } from "@/types";
import { revalidatePath } from "next/cache";

/**
 * 할 일 생성 API
 * @param
 * @returns
 */
export async function createTodo({ name }: CreateTodoInput): Promise<Item> {
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

/**
 * 할 일 수정(isCompleted) API
 * @param
 * @returns
 */
export async function updateTodo({
  itemId,
  isCompleted,
}: {
  itemId: number;
  isCompleted: boolean;
}): Promise<Item> {
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
 * 할 일 목록 조회 API
 * @returns
 */
export async function fetchTodo() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/${TENANT_ID}/items`,
    { cache: "no-cache" },
  );
  if (!res.ok) throw new Error(res.statusText);
  const data: Todo[] = await res.json();
  return data;
}

/**
 * 할 일 상세 조회 API
 * @param itemId
 * @returns
 */
export async function fetchTodoDetail(itemId: number): Promise<Todo> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/${TENANT_ID}/items/${itemId}`,
    { cache: "no-cache" },
  );
  if (!res.ok) throw new Error(res.statusText);
  return await res.json();
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
 * 이미지 url과 함께 할 일 상세 수정 API
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
}: Item): Promise<Item> {
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

/**
 * 할 일 삭제 API
 */
export async function deleteTodo(itemId: number) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/${TENANT_ID}/items/${itemId}`,
    {
      method: "DELETE",
    },
  );

  if (!res.ok) throw new Error(res.statusText);
}

"use server";

import { TENANT_ID } from "@/constants";
import { CreateItemDto, Item, UpdateItemDto } from "@/types";
import { revalidatePath } from "next/cache";

/**
 * 할 일 생성 API
 * @param
 * @returns
 */
export async function createTodo({ name }: CreateItemDto): Promise<Item> {
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

  if (!res.ok) {
    const errorData = await res.json().catch(() => null);
    throw new Error(errorData?.message || res.statusText);
  }

  const data = await res.json();
  revalidatePath("/");
  return data;
}

/**
 * 할 일 수정 API
 * @param
 * @returns
 */
export async function updateTodo(
  itemId: number,
  updateData: UpdateItemDto,
): Promise<Item> {
  const sanitizeValue = (value: any) => {
    if (value === null) return "";
    if (value === undefined) return undefined;
    return value;
  };

  const payload: Record<string, any> = {};

  if (updateData.name !== undefined) {
    payload.name = updateData.name;
  }
  if (updateData.isCompleted !== undefined) {
    payload.isCompleted = updateData.isCompleted;
  }
  if (updateData.memo !== undefined) {
    payload.memo = sanitizeValue(updateData.memo);
  }
  if (updateData.imageUrl !== undefined) {
    payload.imageUrl = sanitizeValue(updateData.imageUrl);
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/${TENANT_ID}/items/${itemId}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(payload),
    },
  );

  if (!res.ok) {
    const errorData = await res.json().catch(() => null);
    throw new Error(errorData?.message || res.statusText);
  }

  const data: Item = await res.json();
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

  if (!res.ok) {
    const errorData = await res.json().catch(() => null);
    throw new Error(errorData?.message || res.statusText);
  }

  const data: Item[] = await res.json();
  return data;
}

/**
 * 할 일 상세 조회 API
 * @param itemId
 * @returns
 */
export async function fetchTodoDetail(itemId: number): Promise<Item> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/${TENANT_ID}/items/${itemId}`,
    { cache: "no-cache" },
  );

  if (!res.ok) {
    const errorData = await res.json().catch(() => null);
    throw new Error(errorData?.message || res.statusText);
  }

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
    },
  );

  if (!res.ok) {
    const errorData = await res.json().catch(() => null);
    throw new Error(errorData?.message || res.statusText);
  }

  const data: { url: string } = await res.json();
  return data.url;
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

  if (!res.ok) {
    const errorData = await res.json().catch(() => null);
    throw new Error(errorData?.message || res.statusText);
  }

  revalidatePath("/");
}

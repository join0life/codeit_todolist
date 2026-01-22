"use client";

import { Item } from "@/types";
import { useState } from "react";
import type { ImageData } from "@/types";

import { useRouter } from "next/navigation";
import {
  deleteTodo,
  updateTodoWithImage,
  uploadImage,
} from "@/app/actions/todo-actions";

import TodoCheckboxSection from "./todo-checkbox-section";
import TodoImageAndMemoSection from "./todo-image-and-memo-section";
import EditAndDeleteButton from "./edit-and-delete-button";

export default function TodoDetailItem({
  id: itemId,
  name: initialName,
  isCompleted: initialIsCompleted,
  memo: initialMemo,
  imageUrl: initialImageUrl,
}: Item) {
  const [name, setName] = useState(initialName);
  const [isCompleted, setIsCompleted] = useState(initialIsCompleted);
  const [image, setImage] = useState<ImageData>();
  const [memo, setMemo] = useState(initialMemo);
  const [isPending, setIsPending] = useState(false);

  const router = useRouter();

  /**
   * 수정하기 버튼
   */
  const handleSave = async () => {
    setIsPending(true);

    try {
      let finalImageUrl = initialImageUrl; // 기존 이미지 url이 있으면 재사용

      if (image) {
        finalImageUrl = await uploadImage(image.file);
      }

      await updateTodoWithImage({
        id: itemId,
        name,
        isCompleted,
        imageUrl: finalImageUrl,
        memo: memo?.trim() === "" ? null : memo,
      });

      router.push("/");
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "알 수 없는 오류가 발생했습니다.";
      alert(message);
    }

    setIsPending(false);
  };

  /**
   * 삭제하기 버튼
   */
  const handleDelete = async (itemId: number) => {
    await deleteTodo(itemId);
    router.push("/");
  };

  return (
    <div className="mx-auto flex max-w-249 flex-col gap-6 p-4 sm:p-6 xl:p-6">
      {/** 1️⃣ 할 일 체크박스 영역 */}
      <TodoCheckboxSection
        name={name}
        isCompleted={isCompleted}
        onNameChange={setName}
        onCompletedChange={setIsCompleted}
      />

      {/* 2️⃣ 이미지 & 메모 영역 */}
      <TodoImageAndMemoSection
        initialImageUrl={initialImageUrl}
        image={image}
        setImage={setImage}
        disabled={isPending}
        memo={memo!}
        setMemo={setMemo}
      />

      {/* 3️⃣ 수정 완료 & 삭제 버튼 */}
      <EditAndDeleteButton
        onSave={handleSave}
        onDelete={handleDelete}
        disabled={isPending}
        itemId={itemId!}
      />
    </div>
  );
}

"use client";
import { updateTodo } from "@/app/actions/todo-actions";
import { Item } from "@/types";
import Link from "next/link";
import { useState } from "react";

export default function TodoItem(todo: Item) {
  const { id: itemId, name, isCompleted } = todo;
  const [isSelected, setIsSelected] = useState(isCompleted);
  const [isPending, setIsPending] = useState(false);

  const handleToggle = async (next: boolean) => {
    setIsSelected(next);
    try {
      setIsPending(true);
      await updateTodo(itemId, { isCompleted: next });
    } catch (e) {
      setIsSelected((prev) => !prev);
      console.error(e);
    } finally {
      setIsPending(false);
    }
  };

  return (
    <Link href={`/items/${itemId}`}>
      <div className="border-ui-strong has-[input:checked]:bg-brand-light flex w-full items-center gap-4 rounded-[27px] border-2 bg-white p-2">
        <label
          className="cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <input
            type="checkbox"
            className="peer sr-only"
            checked={isSelected}
            disabled={isPending}
            onChange={(e) => handleToggle(e.target.checked)}
          />

          {/* 기본 체크 박스 */}
          <div className="border-ui-strong block h-8 w-8 rounded-full border-2 bg-yellow-50 peer-checked:hidden" />

          {/* 체크 시 보라색 원 */}
          <svg
            width="32"
            height="32"
            className="hidden peer-checked:block"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="16" cy="16" r="16" fill="#7C3AED" />
            <path
              d="M8 16.2857L13.8182 22L24 12"
              stroke="#FEFCE8"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </label>

        <div className="peer-checked:line-through">
          <p className="text-ui-bold">{name}</p>
        </div>
      </div>
    </Link>
  );
}

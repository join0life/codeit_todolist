"use client";
import { updateTodo } from "@/app/actions/todo-actions";
import Link from "next/link";
import { useState } from "react";

export default function TodoItem({
  label,
  checked,
  itemId,
}: {
  label: string;
  checked?: boolean;
  itemId: number;
}) {
  const [isCompleted, setIsCompleted] = useState(checked);
  const [isPending, setIsPending] = useState(false);

  const handleToggle = async (next: boolean) => {
    setIsCompleted(next);
    try {
      setIsPending(true);
      await updateTodo({ itemId, isCompleted: next });
    } catch (e) {
      setIsCompleted((prev) => !prev);
      console.error(e);
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="border-ui-strong has-[input:checked]:bg-brand-light flex w-full items-center rounded-[27px] border-2 bg-white p-2">
      <label
        className="flex cursor-pointer items-center gap-4"
        onClick={(e) => e.stopPropagation()}
      >
        <input
          type="checkbox"
          className="peer sr-only"
          checked={isCompleted}
          disabled={isPending}
          onChange={(e) => handleToggle(e.target.checked)}
        />

        {/* 기본 체크 박스 */}
        <svg
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="block peer-checked:hidden"
        >
          <circle
            cx="16"
            cy="16"
            r="15"
            fill="#FEFCE8"
            stroke="#0F172A"
            strokeWidth="2"
          />
        </svg>

        {/* 체크 시 보라색 원으로 교체 */}
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
        <Link
          href={`/items/${itemId}`}
          className="ml-auto peer-checked:line-through"
        >
          <p className="text-ui-bold">{label}</p>
        </Link>
      </label>
    </div>
  );
}

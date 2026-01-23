"use client";

import { useState } from "react";
import AddButton from "../button/add-button";
import { createTodo } from "@/app/actions/todo-actions";

export default function CreateTodoInput({
  isEmpty = false,
}: {
  isEmpty?: boolean;
}) {
  const [name, setName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCreateClick = async () => {
    if (name.trim() === "") return;
    try {
      setIsSubmitting(true);
      await createTodo({ name });
      setName("");
    } catch (e) {
      console.error(e);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="relative h-14 w-full">
        <div className="bg-ui-strong absolute inset-0 translate-x-1 translate-y-1 rounded-[23px]" />

        <div className="border-ui-strong bg-ui-bg relative flex h-full items-center rounded-[23px] border-2 px-6">
          <input
            type="text"
            placeholder="할 일을 입력해주세요"
            className="text-ui-strong placeholder:text-ui-sub w-full bg-transparent outline-none"
            value={name}
            disabled={isSubmitting}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleCreateClick();
            }}
          />
        </div>
      </div>
      <AddButton isEmpty={isEmpty} onClick={handleCreateClick} disabled={isSubmitting} />
    </>
  );
}

import { ReactNode } from "react";
import TodoItem from "./todo-item";
import { TENANT_ID } from "@/constants";
import { Todo } from "@/types";

async function fetchTodo() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/${TENANT_ID}/items`,
  );
  if (!res.ok) throw new Error(res.statusText);
  const data: Todo[] = await res.json();
  return data;
}

export default async function TodoList({
  showCompleted,
  empty,
}: {
  showCompleted: boolean;
  empty: ReactNode;
}) {
  const data = await fetchTodo();
  const filteredTodo = data.filter(
    (todo) => todo.isCompleted === showCompleted,
  );

  if (filteredTodo.length === 0) return <>{empty}</>;

  return (
    <>
      <div className="flex w-full flex-col items-center justify-center gap-4">
        {filteredTodo.map((todo) => {
          return (
            <TodoItem
              itemId={todo.id}
              key={`${todo.id} - ${todo.name}`}
              label={todo.name}
              checked={todo.isCompleted}
            />
          );
        })}
      </div>
    </>
  );
}

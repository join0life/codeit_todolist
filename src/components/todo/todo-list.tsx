import { ReactNode } from "react";
import TodoItem from "./todo-item";
import { Item } from "@/types";

export default async function TodoList({
  empty,
  data,
}: {
  empty: ReactNode;
  data: Item[];
}) {
  const orderedTodo = [...data].sort((a, b) => a.id! - b.id!);

  if (orderedTodo.length === 0) return <>{empty}</>;

  return (
    <>
      {orderedTodo.map((todo) => {
        return (
          <TodoItem
            key={`${todo.id} - ${todo.name} - ${todo.isCompleted}`}
            {...todo}
          />
        );
      })}
    </>
  );
}

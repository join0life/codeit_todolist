import { ReactNode } from "react";
import TodoItem from "./todo-item";
import { Item } from "@/types";

export default async function TodoList({
  showCompleted,
  empty,
  data,
}: {
  showCompleted: boolean;
  empty: ReactNode;
  data: Item[];
}) {
  const filteredTodo = data.filter(
    (todo) => todo.isCompleted === showCompleted,
  );

  const orderedTodo = [...filteredTodo].sort((a, b) => a.id! - b.id!);

  if (orderedTodo.length === 0) return <>{empty}</>;

  return (
    <>
      {orderedTodo.map((todo) => {
        return <TodoItem key={`${todo.id} - ${todo.name}`} {...todo} />;
      })}
    </>
  );
}

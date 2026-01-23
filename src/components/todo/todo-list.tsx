import { ReactNode } from "react";
import TodoItem from "./todo-item";
import { fetchTodo } from "@/app/actions/todo-actions";

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

  const orderedTodo = [...filteredTodo].sort((a, b) => a.id! - b.id!);

  if (orderedTodo.length === 0) return <>{empty}</>;

  return (
    <>
      {orderedTodo.map((todo) => {
        return (
          <TodoItem
            key={`${todo.id} - ${todo.name}`}
            {...todo}
          />
        );
      })}
    </>
  );
}

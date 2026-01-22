import { fetchTodoDetail } from "@/app/actions/todo-actions";
import TodoDetailItem from "@/components/todo/todo-detail-item";

export default async function Page({
  params,
}: {
  params: Promise<{ itemId: string }>;
}) {
  const { itemId: id } = await params;
  const itemId = Number(id);

  const data = await fetchTodoDetail(itemId);

  return (
    <div className="mx-auto min-h-[calc(100dvh-60px)] max-w-300 bg-white">
      <TodoDetailItem {...data} />
    </div>
  );
}

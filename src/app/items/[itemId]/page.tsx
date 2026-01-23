import { fetchTodoDetail } from "@/app/actions/todo-actions";
import Loader from "@/components/loader";
import TodoDetailItem from "@/components/todo/todo-detail-item";
import { Suspense } from "react";

async function DetailTodo({ itemId }: { itemId: number }) {
  const data = await fetchTodoDetail(itemId);

  return (
    <div className="mx-auto min-h-[calc(100dvh-60px)] max-w-300 bg-white">
      <TodoDetailItem {...data} />
    </div>
  );
}

export default async function Page({
  params,
}: {
  params: Promise<{ itemId: string }>;
}) {
  const { itemId: id } = await params;
  const itemId = Number(id);

  return (
    <Suspense fallback={<Loader />}>
      <DetailTodo itemId={itemId} />
    </Suspense>
  );
}

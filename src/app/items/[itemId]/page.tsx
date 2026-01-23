import { fetchTodoDetail } from "@/app/actions/todo-actions";
import Loader from "@/components/loader";
import TodoDetailItem from "@/components/todo/todo-detail-item";
import { TENANT_ID } from "@/constants";
import { Item } from "@/types";
import { Suspense } from "react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: itemsId } = await params;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/${TENANT_ID}/items/${itemsId}`,
  );
  if (!res.ok) throw new Error(res.statusText);

  const data: Item = await res.json();

  return {
    title: `${data.name} - 투두리스트`,
    description: `${data.name} - 투두리스트 상세 페이지입니다.`,
    openGraph: {
      title: `${data.name} - 투두리스트`,
      description: `${data.name} - 투두리스트 상세 페이지입니다.`,
    },
  };
}

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

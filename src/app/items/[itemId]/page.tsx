import TodoDetailItem from "@/components/todo-detail-item";
import { TENANT_ID } from "@/constants";

export async function fetchTodoDetail(itemId: number) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/${TENANT_ID}/items/${itemId}`,
    { cache: "no-store" },
  );
  if (!res.ok) throw new Error(res.statusText);
  return await res.json();
}

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

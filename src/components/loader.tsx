import { LoaderCircle } from "lucide-react";

export default function Loader() {
  return (
    <div className="text-ui-sub flex min-h-[calc(100dvh-60px)] w-full flex-col items-center justify-center gap-2">
      <LoaderCircle className="animate-spin" />
      <div>로딩 중</div>
    </div>
  );
}

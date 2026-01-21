import Image from "next/image";
import todoEmptyLarge from "@/assets/todo-empty-lg.png";
import todoEmptySmall from "@/assets/todo-empty-sm.png";

export default function TodoEmpty() {
  return (
    <div className="flex flex-col items-center justify-center text-center font-bold text-slate-400">
      <Image
        src={todoEmptyLarge}
        alt="해야 할 일정 디폴트 이미지"
        width={240}
        height={240}
        className="hidden sm:block"
      />
      <Image
        src={todoEmptySmall}
        alt="해야 할 일정 디폴트 이미지"
        width={120}
        height={120}
        className="block sm:hidden"
      />

      <div>할 일이 없어요.</div>
      <div>Todo를 새롭게 추가해주세요!</div>
    </div>
  );
}

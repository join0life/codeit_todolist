import Image from "next/image";
import doneEmptyLarge from "@/assets/done-empty-lg.png";
import doneEmptySmall from "@/assets/done-empty-sm.png";

export default function DoneEmpty() {
  return (
    <div className="flex flex-col items-center justify-center text-center font-bold text-slate-400">
      <Image
        src={doneEmptyLarge}
        alt="다 한 일정 디폴트 큰 이미지"
        width={240}
        height={240}
        className="hidden sm:block"
      />
      <Image
        src={doneEmptySmall}
        alt="다 한 일정 디폴트 작은 이미지"
        width={120}
        height={120}
        className="block sm:hidden"
      />
      <div>아직 다 한 일이 없어요.</div>
      <div>해야 할 일을 체크해보세요!</div>
    </div>
  );
}

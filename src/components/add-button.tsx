export default function AddButton() {
  return (
    <button
      type="button"
      className="relative h-14 w-14 cursor-pointer sm:w-40.5 xl:w-42"
    >
      {/* 뒤 레이어 */}
      <div className="absolute inset-0 translate-x-[3px] translate-y-[4px] rounded-[24px] border-2 border-slate-900 bg-slate-900" />

      {/* 앞 레이어 */}
      <div className="relative flex h-[52px] w-full items-center justify-center gap-1 rounded-[24px] border-2 border-slate-900 bg-slate-200">
        {/* + 아이콘 (항상 표시) */}
        <span className="relative block h-4 w-4">
          <span className="absolute top-1/2 left-0 h-[2px] w-full -translate-y-1/2 bg-slate-900" />
          <span className="absolute top-0 left-1/2 h-full w-[2px] -translate-x-1/2 bg-slate-900" />
        </span>

        {/* 텍스트 (375px 이하에서는 숨김) */}
        <span className="font-nanumsquare hidden text-[16px] leading-[18px] font-bold text-slate-900 sm:inline">
          추가하기
        </span>
      </div>
    </button>
  );
}

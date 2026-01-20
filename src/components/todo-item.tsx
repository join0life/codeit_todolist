export default function TodoItem({
  label,
  checked = false,
}: {
  label: string;
  checked?: boolean;
}) {
  return (
    <label className="flex h-12 w-full max-w-[588px] cursor-pointer items-center gap-4 rounded-full border-2 border-slate-900 bg-white px-4 transition-colors peer-has-[:checked]:bg-violet-100">
      {/* 실제 checkbox */}
      <input type="checkbox" className="peer hidden" defaultChecked={checked} />

      {/* 왼쪽 원 */}
      <span className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-slate-900 bg-yellow-50 transition-colors peer-checked:bg-violet-600">
        {/* 체크 표시 */}
        <svg
          viewBox="0 0 24 24"
          className="h-4 w-4 fill-none stroke-white stroke-[3] opacity-0 peer-checked:opacity-100"
        >
          <path
            d="M4 12l5 5 11-11"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>

      {/* 텍스트 */}
      <span className="text-slate-800 transition-colors peer-checked:text-slate-900">
        {label}
      </span>
    </label>
  );
}

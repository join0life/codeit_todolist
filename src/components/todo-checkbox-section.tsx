import { useEffect, useRef } from "react";

type Props = {
  name?: string;
  isCompleted?: boolean;
  onNameChange: (v: string) => void;
  onCompletedChange: (v: boolean) => void;
};

export default function TodoCheckboxSection({
  name,
  isCompleted,
  onNameChange,
  onCompletedChange,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <section>
      <div className="flex h-16 w-full items-center justify-center rounded-3xl border-2 border-slate-900 bg-white p-2 has-[input:checked]:bg-violet-100">
        <label
          className="flex cursor-pointer items-center gap-4"
          onClick={(e) => e.stopPropagation()}
        >
          <input
            type="checkbox"
            className="peer sr-only"
            checked={isCompleted}
            onChange={(e) => onCompletedChange(e.target.checked)}
          />

          {/* 기본 체크 박스 */}
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="block peer-checked:hidden"
          >
            <circle
              cx="16"
              cy="16"
              r="15"
              fill="#FEFCE8"
              stroke="#0F172A"
              strokeWidth="2"
            />
          </svg>

          {/* 체크 시 보라색 원으로 교체 */}
          <svg
            width="32"
            height="32"
            className="hidden peer-checked:block"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="16" cy="16" r="16" fill="#7C3AED" />
            <path
              d="M8 16.2857L13.8182 22L24 12"
              stroke="#FEFCE8"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <input
            ref={inputRef}
            value={name}
            onChange={(e) => onNameChange(e.target.value)}
            className="text-slate-800 underline underline-offset-2 peer-checked:line-through focus:outline-none"
          />
        </label>
      </div>
    </section>
  );
}

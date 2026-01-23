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
    if (!isCompleted) inputRef.current?.focus();
  }, []);

  return (
    <section>
      <div className="border-ui-strong has-[input:checked]:bg-brand-light flex h-16 w-full items-center rounded-3xl border-2 bg-white p-2">
        <label className="flex w-full cursor-pointer items-center justify-center gap-4">
          <input
            type="checkbox"
            className="peer sr-only"
            checked={isCompleted}
            onChange={(e) => onCompletedChange(e.target.checked)}
          />

          {/* 기본 체크 박스 */}
          <div className="border-ui-strong block h-8 w-8 rounded-full border-2 bg-yellow-50 peer-checked:hidden" />

          {/* 체크 시 보라색 원*/}
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
            className="text-ui-bold underline underline-offset-2 peer-checked:line-through"
          />
        </label>
      </div>
    </section>
  );
}

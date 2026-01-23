import { Plus } from "lucide-react";

export default function AddButton({
  isEmpty = false,
  disabled,
  onClick,
}: {
  isEmpty?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`${isEmpty ? "bg-brand-primary text-white" : "bg-ui-line"} btn-responsive gap-1`}
    >
      <Plus width={16} height={16} />
      <span className="hidden sm:inline">추가하기</span>
    </button>
  );
}

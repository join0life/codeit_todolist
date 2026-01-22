import { Plus } from "lucide-react";

export default function AddButton({
  disabled,
  onClick,
}: {
  disabled?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className="hover:bg-brand-primary bg-ui-line btn-responsive gap-1 hover:text-white"
    >
      <Plus width={16} height={16} />
      <span className="hidden sm:inline">추가하기</span>
    </button>
  );
}

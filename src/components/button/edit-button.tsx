import { Check } from "lucide-react";

type Props = {
  onSave: () => Promise<void>;
  disabled?: boolean;
  isActive?: boolean;
};

export default function EditButton({ onSave, disabled, isActive }: Props) {
  return (
    <button
      onClick={onSave}
      disabled={disabled}
      className={`${isActive ? "bg-system-active" : "bg-ui-line"} btn-lg`}
    >
      <Check width={16} height={16} />
      수정 완료
    </button>
  );
}

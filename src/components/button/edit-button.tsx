import { Check } from "lucide-react";

type Props = {
  onSave: () => Promise<void>;
  disabled?: boolean;
};

export default function EditButton({ onSave, disabled }: Props) {
  return (
    <button
      onClick={onSave}
      disabled={disabled}
      className="hover:bg-system-success btn-lg bg-ui-line"
    >
      <Check width={16} height={16} />
      수정 완료
    </button>
  );
}

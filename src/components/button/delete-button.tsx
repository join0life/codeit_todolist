import { X } from "lucide-react";

type Props = {
  onDelete: (itemId: number) => Promise<void>;
  disabled?: boolean;
  itemId: number;
};

export default function DeleteButton({ onDelete, disabled, itemId }: Props) {
  return (
    <button
      disabled={disabled}
      onClick={() => onDelete(itemId!)}
      className="btn-lg bg-system-delete text-white"
    >
      <X width={16} height={16} />
      삭제하기
    </button>
  );
}

import { useEffect, useRef } from "react";
import Image from "next/image";
import editBtn from "@/assets/edit-btn.png";
import type { ImageData } from "@/types";

type Props = {
  initialImageUrl?: string | null;
  image?: ImageData;
  setImage: (image?: ImageData) => void;
  disabled?: boolean;
  memo?: string;
  setMemo: (v?: string) => void;
};

export default function TodoImageAndMemoSection({
  initialImageUrl,
  image,
  setImage,
  disabled,
  memo,
  setMemo,
}: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  /**
   * handleSelectImages 함수:
   * 이벤트 핸들러 함수로 받은 파일을 { File 객체, 미리보기용 임시 url } 로 반환
   */
  const handleSelectImages = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      if (file.size > 5 * 1024 * 1024) {
        alert("이미지는 5MB 이하만 업로드 할 수 있습니다.");
        e.target.value = "";
        return;
      }

      const fileNameWithoutExt = file.name.substring(
        0,
        file.name.lastIndexOf("."),
      );
      const hasNonEnglish = /[^a-zA-Z0-9\-_\s]/.test(fileNameWithoutExt);

      if (hasNonEnglish) {
        alert("이미지 파일명은 영어만 가능합니다.");
        e.target.value = "";
        return;
      }

      setImage({ file, previewUrl: URL.createObjectURL(file) });
    }

    e.target.value = "";
  };

  /**
   * textarea 자동 높이 조절 함수
   */
  const adjustHeight = () => {
    const textarea = textareaRef.current;
    const container = containerRef.current;

    if (textarea && container) {
      textarea.style.height = "auto";

      const maxHeight = container.clientHeight;
      const scrollHeight = textarea.scrollHeight;
      const textareaHeight = maxHeight - 12; // 자연스러운 여백 맞추기 위해 px값 빼주기

      if (scrollHeight <= maxHeight) {
        textarea.style.height = `${scrollHeight}px`;
        textarea.style.overflowY = "hidden";
      } else {
        textarea.style.height = `${textareaHeight}px`;
        textarea.style.overflowY = "auto";
      }
    }
  };

  useEffect(() => {
    adjustHeight();
  }, [memo]);

  return (
    <section className="flex flex-col items-center justify-center gap-6 md:flex-row">
      {/** 이미지 영역 */}
      <input
        type="file"
        accept="image/*"
        className="hidden"
        ref={fileInputRef}
        onChange={handleSelectImages}
        disabled={disabled}
      />

      {initialImageUrl || image ? (
        <div className="relative">
          <Image
            src={image?.previewUrl || initialImageUrl || ""}
            alt={"상세 이미지"}
            className="h-77.75 w-85.75 rounded-3xl object-cover sm:w-174 md:w-96 lg:w-96 xl:w-96"
            width={300}
            height={300}
          />
          <div onClick={() => fileInputRef.current?.click()}>
            <Image
              src={editBtn}
              alt="이미지 수정 버튼"
              width={64}
              height={64}
              className="absolute right-4 bottom-4 cursor-pointer"
            />
          </div>
        </div>
      ) : (
        <button
          onClick={() => fileInputRef.current?.click()}
          className="relative h-77.75 w-85.75 cursor-pointer rounded-3xl border-2 border-dashed border-slate-300 bg-slate-50 sm:w-174 md:w-96 lg:w-96 xl:w-96"
        >
          <svg
            width="64"
            height="64"
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            viewBox="0 0 64 64"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M37.9466 5.33337H26.6666C14.8846 5.33337 5.33331 14.8846 5.33331 26.6667V37.9734C5.33331 49.7554 14.8846 59.3067 26.6666 59.3067H37.9466C49.7287 59.3067 59.28 49.7554 59.28 37.9734V26.6667C59.28 14.8846 49.7287 5.33337 37.9466 5.33337ZM21.6533 16.32C24.5988 16.32 26.9866 18.7079 26.9866 21.6534C26.9866 24.5989 24.5988 26.9867 21.6533 26.9867C18.7078 26.9867 16.32 24.5989 16.32 21.6534C16.32 18.7079 18.7078 16.32 21.6533 16.32ZM41.36 53.6534C48.9097 50.8339 53.9231 43.6323 53.9466 35.5734L53.8666 30.9867C53.8666 29.8934 53.6533 27.84 53.6533 27.84H49.3066C39.2437 27.8706 30.0548 33.5633 25.5466 42.56C22.2744 39.6348 18.0424 38.0122 13.6533 38H10.4266C10.1886 44.1993 13.5557 49.9775 19.0666 52.8267C21.0367 53.8762 23.2345 54.4256 25.4666 54.4267H36.5866C38.2107 54.4499 39.8263 54.1882 41.36 53.6534Z"
              fill="#E2E8F0"
            />
          </svg>

          <svg
            width="64"
            height="64"
            className="absolute right-4 bottom-4"
            viewBox="0 0 64 64"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="32" cy="32" r="32" fill="#E2E8F0" />
            <path
              d="M23 32L41 32"
              stroke="#64748B"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <path
              d="M32 41L32 23"
              stroke="#64748B"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </svg>
        </button>
      )}
      {/** 메모 영역 */}
      <div className="relative h-77.75 w-85.75 rounded-3xl bg-yellow-50 bg-[linear-gradient(to_bottom,transparent_31px,#FEF3C7_31px,#FEF3C7_33px)] [background-size:100%_32px] sm:w-174 md:w-147 lg:w-147 xl:w-147">
        <p className="absolute top-6 left-1/2 -translate-x-1/2 font-extrabold text-amber-800">
          Memo
        </p>

        <div
          ref={containerRef}
          className="absolute inset-0 top-12 flex items-center justify-center p-4"
        >
          <textarea
            disabled={disabled}
            value={memo ?? ""}
            ref={textareaRef}
            onChange={(e) => {
              setMemo(e.target.value);
            }}
            onInput={adjustHeight}
            className="scrollbar-amber w-full resize-none overflow-y-auto text-center outline-none focus:outline-none"
          />
        </div>
      </div>
    </section>
  );
}

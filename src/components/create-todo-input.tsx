export default function CreateTodoInput() {
  return (
    <div className="relative h-14 w-full">
      <div className="absolute inset-0 translate-x-1 translate-y-1 rounded-[23px] bg-slate-900" />

      <div className="relative flex h-full items-center rounded-[23px] border-2 border-slate-900 bg-slate-100 px-6">
        <input
          type="text"
          placeholder="할 일을 입력해주세요"
          className="w-full bg-transparent text-slate-900 outline-none placeholder:text-slate-500"
        />
      </div>
    </div>
  );
}

/**
 * 완료되지 않은 할 일 항목을 표시하는 공용 컴포넌트입니다.
 */

interface TodoUncheckedProps {
  label: string;
}

export default function TodoUnchecked({ label }: TodoUncheckedProps) {
  return (
    <div className="inline-flex items-center gap-2">
      <span className="h-4 w-4 shrink-0 rounded-[6px] border border-[#CBD5E1] bg-white" />

      <span className="text-sm leading-none text-[#1E293B]">{label}</span>
    </div>
  );
}

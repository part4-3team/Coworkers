/**
 * 완료된 할 일 항목을 표시하는 공용 컴포넌트입니다.
 */

interface TodoCheckedProps {
  label: string;
}

export default function TodoChecked({ label }: TodoCheckedProps) {
  return (
    <div className="inline-flex items-center gap-2">
      <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-[6px] bg-[#5189FA]">
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4 8.5L7 11.5L12 6.5"
            stroke="#F8FAFC"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>

      <span className="relative text-sm leading-none text-[#94A3B8] after:absolute after:left-0 after:top-1/2 after:h-px after:w-full after:-translate-y-1/2 after:bg-[#94A3B8]">
        {label}
      </span>
    </div>
  );
}

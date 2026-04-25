import Image from 'next/image';

import ic_search_xlarge from '@/assets/icons/ic_search_xlarge.svg';

export default function BoardSearch() {
  return (
    <div className="relative w-full max-w-85.75 md:max-w-105">
      <div className="absolute inset-y-0 left-3 top-0.5 flex items-center pointer-events-none md:left-4">
        <Image
          src={ic_search_xlarge}
          alt="검색"
          className="w-6 h-6 md:w-8 md:h-8"
        />
      </div>
      <input
        type="text"
        placeholder="검색어를 입력해주세요"
        className="w-full h-12 px-12 py-3 text-text-default text-base font-normal leading-4.75
        rounded-full border-2 border-brand-primary 
        focus:outline-none focus:ring-0 
        md:h-16 md:px-15 md:py-4"
      />
    </div>
  );
}

'use client';

import Image from 'next/image';

import useSearch from '@/app/(service)/boards/hooks/useSearch';
import { icSearchXlarge } from '@/assets';

export default function BoardSearch() {
  const { keyword, handleChange, handleSubmit } = useSearch();

  return (
    <form
      onSubmit={handleSubmit}
      className="relative w-full max-w-85.75 md:max-w-105"
    >
      <div className="absolute inset-y-0 left-3 top-0.5 flex items-center pointer-events-none md:left-4">
        <Image
          src={icSearchXlarge}
          alt="검색"
          width={24}
          height={24}
          className="md:w-8 md:h-8"
        />
      </div>
      <input
        type="text"
        value={keyword}
        onChange={handleChange}
        placeholder="검색어를 입력해주세요"
        className="w-full h-12 px-12 py-3 text-text-default text-base font-normal leading-4.75
        rounded-full border-2 border-brand-primary 
        focus:outline-none focus:ring-0 
        md:h-16 md:px-15 md:py-4"
      />
    </form>
  );
}

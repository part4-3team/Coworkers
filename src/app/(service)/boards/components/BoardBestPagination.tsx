import Image from 'next/image';

import ic_chevron_left_small from '@/assets/icons/ic_chevron_left_small.svg';
import ic_chevron_right_small from '@/assets/icons/ic_chevron_right_small.svg';

export default function BoardBestPagination() {
  return (
    <div className="mt-4.5 md:mt-4 lg:mt-5.5">
      <div className="flex items-center justify-end gap-1">
        <button
          type="button"
          className="w-6 h-6 bg-background-primary rounded-full border border-border-secondary cursor-pointer lg:w-8 lg:h-8"
        >
          <Image
            src={ic_chevron_left_small}
            alt="이전 페이지"
            width={16}
            height={16}
            className="block mx-auto"
          />
        </button>
        <button
          type="button"
          className="w-6 h-6 bg-background-primary rounded-full border border-border-secondary cursor-pointer lg:w-8 lg:h-8"
        >
          <Image
            src={ic_chevron_right_small}
            alt="다음 페이지"
            width={16}
            height={16}
            className="block mx-auto"
          />
        </button>
      </div>
    </div>
  );
}

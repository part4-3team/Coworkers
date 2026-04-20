/**
 * 화면 위에 떠 있는 추가 액션에 사용하는 공용 플로팅 버튼입니다.
 */

import Button from '@/components/common/button/components/Button';
import type { FloatingButtonProps } from '@/components/common/button/types';
import Image from 'next/image';
import plusIcon from '@/assets/icons/ic_plus_large.svg';
import { twMerge } from 'tailwind-merge';

export default function FloatingButton({
  className,
  ...props
}: FloatingButtonProps) {
  return (
    <Button
      className={twMerge(
        'fixed bottom-10 right-3.5 z-100 md:right-6 md:bottom-20 lg:right-10',
        'bg-brand-primary rounded-full w-14 h-14 hover:bg-interaction-hover',
        'shadow-floating',
        className,
      )}
      {...props}
    >
      <Image src={plusIcon} alt="추가 아이콘" width={24} height={24} priority />
    </Button>
  );
}

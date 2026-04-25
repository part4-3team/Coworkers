/**
 * 프로필 이미지를 표시하는 기본 아바타 컴포넌트입니다.
 * 기본 프레임은 사이드바 푸터(40×40, 내부 24×24, rounded-lg)와 동일합니다.
 * 이미지가 없으면 기본 유저 아이콘을 표시합니다.
 */

import Image from 'next/image';

import { icUserLarge } from '@/assets';
import type { AvatarFrameSize } from '@/components/common/avatar/types';
import { cn } from '@/utils/cn';

type AvatarProps = {
  src?: string;
  alt?: string;
  /** 기본 40(사이드바와 동일). 24는 한 칸 전체를 이미지가 채우는 컴팩트 크기 */
  size?: AvatarFrameSize;
  className?: string;
};

export default function Avatar({
  src,
  alt = '',
  size = 40,
  className,
}: AvatarProps) {
  const isSidebarFrame = size === 40;

  if (isSidebarFrame) {
    return (
      <span
        className={cn(
          'flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-background-tertiary',
          className,
        )}
      >
        {src ? (
          <Image
            src={src}
            alt={alt}
            width={24}
            height={24}
            className="size-6 object-cover"
          />
        ) : (
          <Image
            src={icUserLarge}
            alt={alt}
            width={24}
            height={24}
            className="size-6 object-cover"
          />
        )}
      </span>
    );
  }

  return (
    <span
      className={cn(
        'flex size-6 shrink-0 overflow-hidden rounded-lg bg-background-secondary',
        className,
      )}
    >
      {src ? (
        <Image
          src={src}
          alt={alt}
          width={24}
          height={24}
          className="size-6 object-cover"
        />
      ) : (
        <Image
          src={icUserLarge}
          alt={alt}
          width={24}
          height={24}
          className="size-6 object-cover"
        />
      )}
    </span>
  );
}

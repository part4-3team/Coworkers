/**
 * 프로필 이미지를 표시하는 기본 아바타 컴포넌트입니다.
 * 이미지가 없으면 기본 유저 아이콘을 표시합니다.
 * `alt`는 가능하면 호출부에서 사용자 이름 등을 넘기고, 생략 시 짧은 기본 문구로 대체합니다.
 */

import Image from 'next/image';

import { IcUserLarge } from '@/assets';
import type { AvatarProps } from '@/components/common/avatar/types';
import { cn } from '@/utils/cn';

const DEFAULT_AVATAR_ALT = '프로필 이미지';

export default function Avatar({
  src,
  alt,
  size = 40,
  className,
}: AvatarProps) {
  const isSidebarFrame = size === 40;

  return (
    <span
      className={cn(
        'flex shrink-0 overflow-hidden rounded-lg',
        isSidebarFrame
          ? 'size-10 items-center justify-center bg-background-tertiary'
          : 'size-6 bg-background-secondary',
        className,
      )}
    >
      {src ? (
        <Image
          src={src}
          alt={alt ?? DEFAULT_AVATAR_ALT}
          width={24}
          height={24}
          className="size-6 object-cover"
        />
      ) : (
        <IcUserLarge
          width={24}
          height={24}
          className="size-6"
          role="img"
          aria-label={alt ?? DEFAULT_AVATAR_ALT}
        />
      )}
    </span>
  );
}

/**
 * 아바타 이미지와 이름, 설명을 함께 표시하는 유저 프로필 컴포넌트입니다.
 */

import Avatar from '@/components/common/avatar/components/Avatar';
import type { UserProfileProps } from '@/components/common/avatar/types';
import { cn } from '@/utils/cn';

export default function UserProfile({
  src,
  name,
  description,
  className,
}: UserProfileProps) {
  return (
    <div className={cn('flex min-w-0 items-center gap-3', className)}>
      <Avatar src={src} alt={name} />
      <div className="flex min-w-0 flex-col">
        <span className="truncate text-base font-semibold text-text-primary">
          {name}
        </span>
        {description && (
          <span className="truncate text-sm font-medium text-text-default">
            {description}
          </span>
        )}
      </div>
    </div>
  );
}

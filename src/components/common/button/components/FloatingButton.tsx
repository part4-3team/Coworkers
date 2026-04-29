/**
 * 우하단 고정 플로팅 액션(기본 아이콘: 추가)입니다. 위치·크기 조정은 `className`으로 합니다.
 * 텍스트 라벨이 없으므로 스크린 리더용으로 `aria-label` 등 접근 이름을 넘기는 것을 권장합니다.
 *
 * @example
 * ```tsx
 * import { FloatingButton } from '@/components/common/button';
 * <FloatingButton aria-label="할 일 추가" onClick={openCreate} />
 * ```
 */

import IcPlusLarge from '@/assets/icons/ic_plus_large.svg';
import Button from '@/components/common/button/components/Button';
import type { FloatingButtonProps } from '@/components/common/button/types';
import { cn } from '@/utils/cn';

export default function FloatingButton({
  className,
  ...props
}: FloatingButtonProps) {
  return (
    <Button
      className={cn(
        'fixed bottom-10 right-3.5 z-100 md:right-6 md:bottom-20 lg:right-10',
        'bg-brand-primary rounded-full w-14 h-14 hover:bg-interaction-hover',
        'shadow-floating',
        className,
      )}
      {...props}
    >
      <IcPlusLarge width={24} height={24} role="img" aria-label="추가 아이콘" />
    </Button>
  );
}

'use client';

import { useRouter } from 'next/navigation';

import { IcPencil } from '@/assets';
import { FloatingButton } from '@/components/common/button';
import { ROUTES } from '@/constants/ROUTES';

export default function BoardWriteFloatingButton() {
  const router = useRouter();

  const handleClick = () => {
    router.push(`${ROUTES.BOARDS}?write=true`, { scroll: false });
  };

  return (
    <FloatingButton
      type="button"
      aria-label="게시글 작성"
      onClick={handleClick}
    >
      <IcPencil width={24} height={24} aria-hidden="true" />
    </FloatingButton>
  );
}

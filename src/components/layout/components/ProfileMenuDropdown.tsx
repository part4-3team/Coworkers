'use client';

import type { ReactNode } from 'react';
import { useState } from 'react';

/**
 * 헤더와 사이드바 프로필 영역에서 공통으로 사용하는 메뉴 드롭다운입니다.
 */

import { useRouter } from 'next/navigation';

import { ListDropdown } from '@/components/common/dropdown';
import Modal from '@/components/common/modal';
import { ROUTES } from '@/constants/ROUTES';
import { clearAuthSession } from '@/utils/authSession';
import { cn } from '@/utils/cn';

type ProfileMenuDropdownProps = {
  trigger: ReactNode;
  className?: string;
  menuClassName?: string;
  onNavigate?: () => void;
  horizontalAlign?: 'start' | 'end';
  verticalPosition?: 'top' | 'bottom';
};

export default function ProfileMenuDropdown({
  trigger,
  className,
  menuClassName,
  onNavigate,
  horizontalAlign,
  verticalPosition,
}: ProfileMenuDropdownProps) {
  const router = useRouter();
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const handleMove = (href: string) => {
    onNavigate?.();
    router.push(href);
  };

  const handleOpenLogoutModal = () => {
    setIsLogoutModalOpen(true);
  };

  const handleCloseLogoutModal = () => {
    setIsLogoutModalOpen(false);
  };

  const handleConfirmLogout = () => {
    handleCloseLogoutModal();
    clearAuthSession();
    handleMove(ROUTES.LOGIN);
  };

  return (
    <>
      <ListDropdown
        trigger={trigger}
        className={className}
        menuClassName={cn('w-36', menuClassName)}
        horizontalAlign={horizontalAlign}
        verticalPosition={verticalPosition}
        items={[
          {
            label: '마이 히스토리',
            onClick: () => handleMove(ROUTES.MY_HISTORY),
          },
          {
            label: '계정 설정',
            onClick: () => handleMove(ROUTES.MY_PAGE),
          },
          {
            label: '팀 참여',
            onClick: () => handleMove(ROUTES.JOIN_TEAM),
          },
          {
            label: '로그아웃',
            onClick: handleOpenLogoutModal,
          },
        ]}
      />

      {isLogoutModalOpen && (
        <Modal
          onClose={handleCloseLogoutModal}
          hasIcon
          hasCloseButton={false}
          title="로그아웃 하시겠어요?"
          description="현재 계정에서 로그아웃됩니다."
          lineButtonText="닫기"
          onLineButtonClick={handleCloseLogoutModal}
          subButtonText="로그아웃"
          onSubButtonClick={handleConfirmLogout}
        />
      )}
    </>
  );
}

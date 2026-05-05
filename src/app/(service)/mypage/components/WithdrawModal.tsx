'use client';

import { useRouter } from 'next/navigation';

import Modal from '@/components/common/modal';
import { useToast } from '@/components/common/toast';
import { ROUTES } from '@/constants/ROUTES';
import { useDeleteMeMutation } from '@/hooks/useUser';
import { clearAuthSession } from '@/utils/authSession';

type Props = {
  onClose: () => void;
};

export default function WithdrawModal({ onClose }: Props) {
  const router = useRouter();
  const { showToast } = useToast();
  const deleteMeMutation = useDeleteMeMutation({
    onError: () => {
      showToast('회원 탈퇴에 실패했습니다. 다시 시도해주세요.', 'error');
    },
    onSuccess: () => {
      clearAuthSession();
      onClose();
      showToast('회원 탈퇴가 완료되었습니다.', 'error');
      router.replace(ROUTES.LOGIN);
    },
  });

  const handleWithdraw = () => {
    if (deleteMeMutation.isPending) {
      return;
    }

    deleteMeMutation.mutate();
  };

  return (
    <Modal
      onClose={onClose}
      hasIcon={true}
      title="회원 탈퇴를 진행하시겠어요?"
      hasCloseButton={false}
      description={`그룹장으로 있는 그룹은 자동으로 삭제되고,\n 모든 그룹에서 탈퇴됩니다.`}
      lineButtonText="닫기"
      onLineButtonClick={onClose}
      subButtonText="회원 탈퇴"
      onSubButtonClick={handleWithdraw}
    />
  );
}

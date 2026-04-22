import { useState } from 'react';

export function useModalState() {
  const [isMemberModalOpen, setIsMemberModalOpen] = useState(false);
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);

  const handleInvite = () => {
    setIsMemberModalOpen(false);
    setIsInviteModalOpen(true);
  };

  return {
    isMemberModalOpen,
    isInviteModalOpen,
    openMemberModal: () => setIsMemberModalOpen(true),
    closeMemberModal: () => setIsMemberModalOpen(false),
    openInviteModal: () => setIsInviteModalOpen(true),
    closeInviteModal: () => setIsInviteModalOpen(false),
    handleInvite,
  };
}

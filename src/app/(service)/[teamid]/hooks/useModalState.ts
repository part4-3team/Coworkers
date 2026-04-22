import { useState } from 'react';
import { ModalKey } from '../types';

export function useModalState() {
  const [openModal, setOpenModal] = useState<ModalKey | null>(null);

  const open = (key: ModalKey) => setOpenModal(key);
  const close = () => setOpenModal(null);

  const handleInvite = () => setOpenModal('memberInvite');

  return {
    openModal,
    open,
    close,
    handleInvite,
    is: (key: ModalKey) => openModal === key,
  };
}

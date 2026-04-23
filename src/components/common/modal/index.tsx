import ModalFrame from '@/components/common/modal/components/ModalFrame';
import ModalPortal from '@/components/common/modal/components/ModalPortal';

import { ModalFrameProps } from './types';

export { default as EditDeleteModal } from '@/components/common/modal/components/EditDeleteModal';
export type { EditDeleteModalProps } from '@/components/common/modal/types';

export default function Modal(props: ModalFrameProps) {
  return (
    <ModalPortal>
      <ModalFrame {...props} />
    </ModalPortal>
  );
}

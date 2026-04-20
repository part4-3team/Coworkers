import ModalPortal from '@/components/common/modal/components/ModalPortal';
import ModalFrame from '@/components/common/modal/components/ModalFrame';
import { ModalFrameProps } from './types';

export default function Modal(props: ModalFrameProps) {
  return (
    <ModalPortal>
      <ModalFrame {...props} />
    </ModalPortal>
  );
}

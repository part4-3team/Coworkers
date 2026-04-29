'use client';

import { useEffect, useState } from 'react';

import { BOARD_DEVICE_TYPE } from '@/app/(service)/boards/constants';
import type { BoardDeviceType } from '@/app/(service)/boards/types';

export default function useDeviceType() {
  const [deviceType, setDeviceType] = useState<BoardDeviceType | null>(null);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width >= 1280) setDeviceType(BOARD_DEVICE_TYPE.PC);
      else if (width >= 768) setDeviceType(BOARD_DEVICE_TYPE.TABLET);
      else setDeviceType(BOARD_DEVICE_TYPE.MOBILE);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return deviceType;
}

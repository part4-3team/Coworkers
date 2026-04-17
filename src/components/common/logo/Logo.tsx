/**
 * 서비스 로고 SVG를 공통으로 렌더링하는 컴포넌트입니다.
 */

import Image from 'next/image';

import { imgLogoTextLarge, imgLogoTextSmall } from '@/assets';

type LogoSize = 'small' | 'large';

const LOGO_SIZE_MAP = {
  small: {
    src: imgLogoTextSmall,
    width: 158,
    height: 22,
  },
  large: {
    src: imgLogoTextLarge,
    width: 225,
    height: 31,
  },
} as const;

interface LogoProps {
  className?: string;
  size?: LogoSize;
}

export default function Logo({ className, size = 'large' }: LogoProps) {
  const logo = LOGO_SIZE_MAP[size];

  return (
    <Image
      src={logo.src}
      alt="Coworkers"
      width={logo.width}
      height={logo.height}
      className={className}
    />
  );
}

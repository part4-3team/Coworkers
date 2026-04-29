/**
 * 서비스 로고 SVG를 공통으로 렌더링하는 컴포넌트입니다.
 */

import { ImgLogoTextLarge, ImgLogoTextSmall } from '@/assets';

type LogoSize = 'small' | 'large';

const LOGO_SIZE_MAP = {
  small: {
    Component: ImgLogoTextSmall,
    width: 158,
    height: 22,
  },
  large: {
    Component: ImgLogoTextLarge,
    width: 225,
    height: 31,
  },
} as const;

type LogoProps = {
  className?: string;
  size?: LogoSize;
};

export default function Logo({ className, size = 'large' }: LogoProps) {
  const logo = LOGO_SIZE_MAP[size];
  const LogoComponent = logo.Component;

  return (
    <LogoComponent
      width={logo.width}
      height={logo.height}
      className={className}
      role="img"
      aria-label="Coworkers"
    />
  );
}

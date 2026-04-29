/**
 * 심볼과 텍스트 SVG를 조합해 전체 서비스 로고를 렌더링하는 컴포넌트입니다.
 */

import ImgLogoSymbolLarge from '@/assets/logos/img_logo_symbol_large.svg';
import ImgLogoTextLarge from '@/assets/logos/img_logo_text_large.svg';
import { cn } from '@/utils/cn';

const FULL_LOGO_SIZE_MAP = {
  auth: {
    gapClassName: 'gap-2.5',
    symbolWidth: 51,
    symbolHeight: 35,
    textWidth: 148,
    textHeight: 20,
  },
  sidebar: {
    gapClassName: 'gap-2',
    symbolWidth: 35,
    symbolHeight: 24,
    textWidth: 102,
    textHeight: 14,
  },
} as const;

type FullLogoSize = keyof typeof FULL_LOGO_SIZE_MAP;

type FullLogoProps = {
  className?: string;
  size?: FullLogoSize;
};

export default function FullLogo({ className, size = 'auth' }: FullLogoProps) {
  const logo = FULL_LOGO_SIZE_MAP[size];

  return (
    <span
      className={cn('inline-flex items-center', logo.gapClassName, className)}
    >
      <ImgLogoSymbolLarge
        width={logo.symbolWidth}
        height={logo.symbolHeight}
        aria-hidden="true"
      />
      <ImgLogoTextLarge
        width={logo.textWidth}
        height={logo.textHeight}
        aria-hidden="true"
      />
    </span>
  );
}

/**
 * 랜딩 페이지에서 사용하는 TypeScript 타입을 정의하는 파일입니다.
 */

import type { ReactNode } from 'react';

import type { StaticImageData } from 'next/image';

export type LandingTaskColumnImage = {
  alt: string;
  image: StaticImageData;
};

export type LandingSectionContent = {
  description: string;
  eyebrow: string;
  image?: StaticImageData;
  imageAlt?: string;
  title: string;
};

export type LandingRevealDirection = 'left' | 'right' | 'scale' | 'up';

export type LandingRevealDelay = 'long' | 'medium' | 'none' | 'short';

export type LandingScrollRevealProps = {
  animateOnMount?: boolean;
  children: ReactNode;
  className?: string;
  delay?: LandingRevealDelay;
  direction?: LandingRevealDirection;
};

export type LandingFeatureCopyProps = {
  className?: string;
  description: string;
  icon: StaticImageData;
  iconClassName?: string;
  isInverse?: boolean;
  revealDirection?: LandingRevealDirection;
  title: string;
};

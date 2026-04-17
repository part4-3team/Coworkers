/**
 * 소셜 로그인/회원가입 버튼 컴포넌트입니다.
 */

import Button from '@/components/common/Button';

interface OAuthButtonProps {
  children?: string;
}

export default function OAuthButton({
  children = '소셜 계정으로 계속하기',
}: OAuthButtonProps) {
  return <Button>{children}</Button>;
}

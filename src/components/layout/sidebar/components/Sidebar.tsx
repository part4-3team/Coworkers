'use client';

/**
 * 서비스 화면에서 사용하는 공통 사이드바 컴포넌트입니다.
 */

import SidebarFooter from '@/components/layout/sidebar/components/SidebarFooter';
import SidebarHeader from '@/components/layout/sidebar/components/SidebarHeader';
import SidebarNav from '@/components/layout/sidebar/components/SidebarNav';
import useSidebar from '@/components/layout/sidebar/hooks/useSidebar';
import { cn } from '@/utils/cn';

export default function Sidebar() {
  const { handleToggleSidebar, isExpanded } = useSidebar();

  return (
    <aside
      className={cn(
        'hidden md:flex sticky top-0 h-screen flex-col justify-between bg-background-inverse text-text-default transition-all duration-300',
        isExpanded ? 'w-67.5 min-w-67.5' : 'w-18 min-w-18',
      )}
    >
      <div className="min-h-0 flex-1">
        <SidebarHeader isExpanded={isExpanded} onToggle={handleToggleSidebar} />
        <SidebarNav isExpanded={isExpanded} />
      </div>

      <SidebarFooter isExpanded={isExpanded} />
    </aside>
  );
}

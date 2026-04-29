/**
 * 랜딩 페이지의 전체 UI를 구성하는 컴포넌트입니다.
 */
import LandingCtaSection from '@/app/(landing)/components/LandingCtaSection';
import LandingHeroSection from '@/app/(landing)/components/LandingHeroSection';
import LandingTaskColumnSection from '@/app/(landing)/components/LandingTaskColumnSection';
import LandingTaskDetailSection from '@/app/(landing)/components/LandingTaskDetailSection';
import LandingTaskListSection from '@/app/(landing)/components/LandingTaskListSection';

export default function LandingPage() {
  return (
    <main className="overflow-hidden bg-background-primary">
      <LandingHeroSection />

      <LandingTaskColumnSection />

      <LandingTaskListSection />

      <LandingTaskDetailSection />

      <LandingCtaSection />
    </main>
  );
}
